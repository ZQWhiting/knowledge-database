import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DELETE_FILE } from '../../../controllers/file';
import { RESET_TAGS } from '../../../utils/actions';
import { useStoreContext } from '../../../utils/store';

function DeleteFile({
	file: { _id, name },
	setName,
	setContent,
	setActiveFile,
}) {
	const [, dispatch] = useStoreContext();
	const [deleteFile] = useMutation(DELETE_FILE, {
		variables: { _id },
		onCompleted: () => {
			console.log('File successfully deleted.');
			setName('');
			setContent('');
			dispatch({ type: RESET_TAGS });
			setActiveFile(null);
		},
		onError: (e) => {
			console.error(e.message);
		},
		update: (cache, { data: { deleteFile } }) => {
			cache.modify({
				fields: {
					files(cachedFiles, { readField }) {
						return cachedFiles.filter(
							(fileRef) =>
								deleteFile._id !== readField('_id', fileRef)
						);
					},
				},
			});
		},
	});

	const confirmDelete = () => {
		const response = window.confirm(
			`Are you sure you want to delete ${name}?`
		);
		if (response) deleteFile();
	};

	return (
		<span onClick={confirmDelete}>
			<FontAwesomeIcon icon={faTrash} />
		</span>
	);
}

export default DeleteFile;
