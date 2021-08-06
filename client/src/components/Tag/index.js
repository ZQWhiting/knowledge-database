import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import CreateTag from '../CreateTag';
import TagList from '../TagList';
import DeleteTag from '../DeleteTag';
import UpdateTag from '../UpdateTag';
import { useStoreContext } from '../../utils/store';
import {
	ADD_SEARCH_TAG,
	REMOVE_SEARCH_TAG,
	ADD_OPEN_TAG,
	REMOVE_OPEN_TAG,
} from '../../utils/actions';
import './style.scss';
import classNames from 'classnames';

function Tag({ tag }) {
	const [state, dispatch] = useStoreContext();
	const [childrenOpen, setChildrenOpen] = useState(
		state.openTags.includes(tag._id)
	);
	const [updateFormOpen, setUpdateFormOpen] = useState(false);
	const [checkboxValue, setCheckboxValue] = useState(
		state.searchTags.includes(tag._id)
	);

	const onOpen = () => {
		if (childrenOpen) {
			dispatch({
				type: REMOVE_OPEN_TAG,
				id: tag._id,
			});
		} else {
			dispatch({
				type: ADD_OPEN_TAG,
				id: tag._id,
			});
		}
		setChildrenOpen(!childrenOpen);
	};

	const onCheckChange = () => {
		if (checkboxValue) {
			dispatch({
				type: REMOVE_SEARCH_TAG,
				id: tag._id,
			});
		} else {
			dispatch({
				type: ADD_SEARCH_TAG,
				id: tag._id,
			});
		}
		setCheckboxValue(!checkboxValue);
	};
	return (
		<div key={tag._id}>
			<div>
				<span onClick={onOpen}>
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
				<span>
					<DeleteTag name={tag.name} _id={tag._id} />
				</span>
			</div>
			{childrenOpen && (
				<div className={classNames('tab')}>
					{!!tag.children.length && <TagList tags={tag.children} />}
					<CreateTag parent_id={tag._id} />
				</div>
			)}
		</div>
	);
}

export default Tag;
