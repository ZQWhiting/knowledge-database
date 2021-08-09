import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_FILE } from '../../../controllers/file';
import { useStoreContext } from '../../../utils/store';
import { RESET_TAGS } from '../../../utils/actions';
import './style.scss';

function CreateFile() {
	const [content, setContent] = useState('');
	const [name, setName] = useState('');
	const [state, dispatch] = useStoreContext();
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
		},
	});

	const submitHandler = (e) => {
		e.preventDefault();

		createfile();
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
		</form>
	);
}

export default CreateFile;
