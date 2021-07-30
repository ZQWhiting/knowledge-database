import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_TAG } from '../utils/mutations';

function TagForm() {
	const [formState, setFormState] = useState({ name: '' });
	const [createTag, { error }] = useMutation(CREATE_TAG);

	const handleFormChange = (event) => {
		const { key, value } = event.target;
		setFormState({
			...formState,
			[key]: value,
		});
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();
		try {
			const mutationReponse = await createTag({
				variables: {
					name: formState.name.trim(),
				},
			});
		} catch (e) {
			console.error(e);
		}
	};

	return (
		<form onSubmit={handleFormSubmit}>
			<label for='name'></label>
			<input
				type='text'
				name='name'
				id='tag-name'
				onChange={handleFormChange}
			></input>
			<button type='submit' />
		</form>
	);
}

export default TagForm;
