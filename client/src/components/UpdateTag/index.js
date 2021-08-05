import { useMutation } from '@apollo/react-hooks';
import classNames from 'classnames';
import { useState } from 'react';
import { UPDATE_TAG_NAME } from '../../controllers/tag';

function UpdateTag({ setUpdateFormOpen, tag }) {
	const [name, setName] = useState(tag.name);
	const [inputError, setInputError] = useState(false);
	const [updateTag] = useMutation(UPDATE_TAG_NAME, {
		variables: { ...tag, name: name.trim() },
		onCompleted: () => {
			console.log('Tag successfully updated.');
			setName('');
			setUpdateFormOpen(false);
		},
		onError: (e) => {
			setInputError(true);
			console.error(e.message);
		},
		update: (cache, { data: { updateTagName } }) => {
			cache.modify({
				id: cache.identify(updateTagName),
				fields: {
					name(cachedName) {
						return updateTagName.name;
					},
				},
			});
		},
	});

	const submitInput = () => {
		if (name) updateTag();
		else setUpdateFormOpen(false);
	};

	return (
		<input
			onBlur={submitInput}
			onKeyDown={(event) => {
				if (event.key === 'Enter') submitInput();
			}}
			type='text'
			name='name'
			id='tag-name'
			onChange={(e) => setName(e.target.value)}
			value={name}
			onFocus={() => setInputError(false)}
			autoFocus
			className={classNames('input', {
				error: inputError ? true : false,
			})}
		></input>
	);
}

export default UpdateTag;
