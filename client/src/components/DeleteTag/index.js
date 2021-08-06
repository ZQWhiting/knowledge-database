import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DELETE_TAG } from '../../controllers/tag';

function DeleteTag({ _id, name }) {
	const [deleteTag] = useMutation(DELETE_TAG, {
		variables: { _id },
		onCompleted: () => {
			console.log('Tag successfully deleted.');
		},
		onError: (e) => {
			console.error(e.message);
		},
		update: (cache, { data: { deleteTag } }) => {
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
