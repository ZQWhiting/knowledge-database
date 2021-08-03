import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CREATE_TAG } from '../../controllers/tag';
import classNames from 'classnames';
import './style.scss';

function CreateTag({ id = null }) {
	const [active, setActive] = useState(false);
	const [inputError, setInputError] = useState(false);
	const [name, setName] = useState('');
	const [createTag] = useMutation(CREATE_TAG, {
		onCompleted: () => {
			console.log('Tag successfully saved.');
			setName('');
			setActive(false);
		},
		onError: (e) => {
			setInputError(true);
			console.error(e.message);
		},
		variables: { name: name.trim(), parent_id: id },
	});

	const submitInput = () => {
		if (name) createTag();
		else setActive(false);
	};

	const activateForm = () => {
		setActive(true);
	};

	return (
		<div className={classNames(id && 'tab')}>
			{active ? (
				<input
					onBlur={submitInput}
					type='text'
					name='name'
					id='tag-name'
					onChange={(e) => setName(e.target.value)}
					value={name}
					placeholder='new tag'
					onFocus={() => setInputError(false)}
					autoFocus
					className={classNames('input', {
						error: inputError ? true : false,
					})}
				></input>
			) : (
				<FontAwesomeIcon
					icon={faPlusCircle}
					className={classNames('add-tag-btn')}
					onClick={activateForm}
				/>
			)}
		</div>
	);
}

export default CreateTag;
