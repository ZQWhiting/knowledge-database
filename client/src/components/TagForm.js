import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TAG } from '../utils/mutations';

function TagForm() {
	const [name, setName] = useState('');
	const [createTag, { error }] = useMutation(CREATE_TAG);

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			await createTag({
				variables: {
					name: name.trim(),
				},
			});

			setName('');
		} catch (e) {
			alert(error);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
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
