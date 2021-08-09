import { gql, useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DELETE_TAG } from '../../../controllers/tag';
import { useStoreContext } from '../../../utils/store';
import { REMOVE_OPEN_TAG, REMOVE_SEARCH_TAG } from '../../../utils/actions';

function DeleteTag({ _id, name }) {
	const [state, dispatch] = useStoreContext();
	const [deleteTag] = useMutation(DELETE_TAG, {
		variables: { _id },
		onCompleted: () => {
			console.log('Tag successfully deleted.');
		},
		onError: (e) => {
			console.error(e.message);
		},
		update: (cache, { data: { deleteTag } }) => {
			const removeStore = (tag) => {
				const cachedTag = cache.readFragment({
					id: cache.identify(tag),
					fragment: gql`
						fragment deletedTag on Tag {
							children {
								_id
							}
						}
					`,
				});
				if (state.searchTags.includes(tag._id))
					dispatch({
						type: REMOVE_SEARCH_TAG,
						id: tag._id,
					});

				if (state.openTags.includes(tag._id))
					dispatch({
						type: REMOVE_OPEN_TAG,
						id: tag._id,
					});

				if (cachedTag.children)
					cachedTag.children.forEach((child) => removeStore(child));
			};
			removeStore(deleteTag);

			if (deleteTag.parent) {
				cache.modify({
					id: cache.identify(deleteTag.parent),
					fields: {
						children(cachedTags, { readField }) {
							return cachedTags.filter(
								(tagRef) =>
									deleteTag._id !== readField('_id', tagRef)
							);
						},
					},
				});
			} else {
				cache.modify({
					fields: {
						tags(cachedTags, { readField }) {
							return cachedTags.filter(
								(tagRef) =>
									deleteTag._id !== readField('_id', tagRef)
							);
						},
					},
				});
			}
		},
	});

	const confirmDelete = () => {
		const response = window.confirm(
			`Are you sure you want to delete ${name}? This operation will delete all children tags.`
		);
		if (response) deleteTag();
	};

	return (
		<span onClick={confirmDelete}>
			<FontAwesomeIcon icon={faTrash} />
		</span>
	);
}

export default DeleteTag;
