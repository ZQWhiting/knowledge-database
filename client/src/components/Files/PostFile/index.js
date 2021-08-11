import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FILE, UPDATE_FILE } from '../../../controllers/file';
import { useStoreContext } from '../../../utils/store';
import { RESET_TAGS } from '../../../utils/actions';
import './style.scss';
import DeleteFile from '../DeleteFile';

function PostFile({ file = null, setActiveFile }) {
	const [content, setContent] = useState(file ? file.content : '');
	const [name, setName] = useState(file ? file.name : '');
	const [state, dispatch] = useStoreContext();

	useEffect(() => {
		setName(file ? file.name : '');
		setContent(file ? file.content : '');
	}, [file]);

	const [createfile] = useMutation(CREATE_FILE, {
		variables: {
			name: name,
			type: 'md',
			content: content,
			tags: state.searchTags,
		},
		onError: (err) => {
			console.error(err);
		},
		onCompleted: () => {
			console.log('File successfuly Saved');
			setName('');
			setContent('');
			dispatch({ type: RESET_TAGS });
			setActiveFile(null);
		},
	});
	const [updateFile] = useMutation(UPDATE_FILE, {
		variables: {
			_id: file?._id,
			name: name,
			type: 'md',
			content: content,
			tags: state.searchTags,
		},
		onError: (err) => {
			console.error(err);
		},
		onCompleted: () => {
			console.log('File successfuly Updated');
			setName('');
			setContent('');
			dispatch({ type: RESET_TAGS });
			setActiveFile(null);
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();

		if (!file) createfile();
		else updateFile();
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
			{file && (
				<DeleteFile
					file={file}
					setName={setName}
					setContent={setContent}
					setActiveFile={setActiveFile}
				/>
			)}
		</form>
	);
}

export default PostFile;
