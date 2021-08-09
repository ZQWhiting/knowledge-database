import { useState } from 'react';
import { gql, useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { CREATE_TAG } from '../../../controllers/tag';
import classNames from 'classnames';
import './style.scss';

function CreateTag({ parent_id = null }) {
	const [active, setActive] = useState(false);
	const [inputError, setInputError] = useState(false);
	const [name, setName] = useState('');
	const [createTag] = useMutation(CREATE_TAG, {
		variables: { name: name.trim(), parent_id },
		onCompleted: () => {
			console.log('Tag successfully saved.');
			setName('');
			setActive(false);
		},
		onError: (e) => {
			setInputError(true);
			console.error(e.message);
		},
		update: (cache, { data: { createTag } }) => {
			const newTagRef = cache.writeFragment({
				data: createTag,
				fragment: gql`
					fragment newTag on Tag {
						_id
						name
						parent {
							_id
							name
						}
					}
				`,
			});
			if (parent_id) {
				cache.modify({
					id: cache.identify(createTag.parent),
					fields: {
						children(cachedChildren) {
							return [...cachedChildren, newTagRef];
						},
					},
				});
			} else {
				cache.modify({
					fields: {
						tags(cachedTags) {
							return [...cachedTags, newTagRef];
						},
					},
				});
			}
		},
	});

	const submitInput = () => {
		if (name) createTag();
		else setActive(false);
	};

	return (
		<span>
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
					onClick={() => setActive(true)}
				/>
			)}
		</span>
	);
}

export default CreateTag;
