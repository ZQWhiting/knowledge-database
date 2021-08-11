import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FILE, UPDATE_FILE } from '../../../controllers/file';
import { useStoreContext } from '../../../utils/store';
import { RESET_TAGS } from '../../../utils/actions';
import './style.scss';
import DeleteFile from '../DeleteFile';
import { FILE_FIELDS } from '../../../controllers/fragments';

function PostFile({ file = null, setActiveFile }) {
	const [content, setContent] = useState(file ? file.content : '');
	const [name, setName] = useState(file ? file.name : '');
	const [state, dispatch] = useStoreContext();

	useEffect(() => {
		setName(file ? file.name : '');
		setContent(file ? file.content : '');
	}, [file]);

	const [postFile] = useMutation(file ? UPDATE_FILE : CREATE_FILE, {
		variables: {
			_id: file?._id || null,
			name: name,
			type: 'md',
			content: content,
			tags: state.searchTags,
		},
		onError: (err) => {
			console.error(err);
		},
		onCompleted: () => {
			console.log(`File successfuly ${file ? 'UPDATED' : 'SAVED'}`);
			if (file) {
				setActiveFile(null);
			} else {
				setName('');
				setContent('');
			}
			dispatch({ type: RESET_TAGS });
		},
		update: (cache, { data: { createFile } }) => {
			if (!file) {
				const newFileRef = cache.writeFragment({
					data: createFile,
					fragment: FILE_FIELDS,
				});
				cache.modify({
					fields: {
						files(cachedFiles) {
							return [...cachedFiles, newFileRef];
						},
					},
				});
			}
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();

		postFile();
	};
	return (
		<form onSubmit={submitHandler}>
			<input
				type='text'
				name='name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			></input>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				name='content'
			></textarea>
			<button type='submit'>submit</button>
			{file && <DeleteFile file={file} setActiveFile={setActiveFile} />}
		</form>
	);
}

export default PostFile;
