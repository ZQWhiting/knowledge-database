import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import CreateTag from '../CreateTag';
import TagList from '../TagList';
import DeleteTag from '../DeleteTag';
import UpdateTag from '../UpdateTag';
import { useStoreContext } from '../../utils/store';
import { ACTIVATE_TAG, DEACTIVATE_TAG } from '../../utils/actions';

function Tag({ tag }) {
	const [state, dispatch] = useStoreContext();
	const [childrenOpen, setChildrenOpen] = useState(false);
	const [updateFormOpen, setUpdateFormOpen] = useState(false);
	const [checkboxValue, setCheckboxValue] = useState(
		state.activatedTags.includes(tag._id)
	);

	const onCheckChange = () => {
		if (checkboxValue) {
			dispatch({
				type: DEACTIVATE_TAG,
				id: tag._id,
			});
		} else {
			dispatch({
				type: ACTIVATE_TAG,
				id: tag._id,
			});
		}
		setCheckboxValue(!checkboxValue);
	};
	return (
		<div key={tag._id}>
			<div>
				<span onClick={() => setChildrenOpen(!childrenOpen)}>
					<FontAwesomeIcon
						icon={childrenOpen ? faAngleUp : faAngleDown}
					/>
				</span>
				{updateFormOpen ? (
					<UpdateTag
						setUpdateFormOpen={setUpdateFormOpen}
						tag={tag}
					/>
				) : (
					<span onDoubleClick={() => setUpdateFormOpen(true)}>
						{tag.name}
					</span>
				)}
				<span>
					<input
						type='checkbox'
						checked={checkboxValue}
						onChange={onCheckChange}
					/>
				</span>
			</div>
			{childrenOpen && (
				<>
					{!!tag.children.length && <TagList tags={tag.children} />}
					<CreateTag id={tag._id} />
					<DeleteTag id={tag._id} />
				</>
			)}
		</div>
	);
}

export default Tag;
