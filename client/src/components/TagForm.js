import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TAG } from '../controllers/tag';

function TagForm() {
	const [name, setName] = useState('');
	const [createTag] = useMutation(CREATE_TAG, {
		onCompleted: () => {
            setName('')
            console.log('Tag successfully saved.')
        },
		onError: (e) => {
            console.error(e.message)
		},
		variables: { name: name.trim() },
	});

	const onSubmit = (event) => {
		event.preventDefault();
		createTag();
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				type='text'
				name='name'
				id='tag-name'
				onChange={(e) => setName(e.target.value)}
				value={name}
				placeholder='new tag'
			></input>
			<button type='submit'>Submit</button>
		</form>
	);
}

export default TagForm;
