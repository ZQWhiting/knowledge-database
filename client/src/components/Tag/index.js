import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import CreateTag from '../CreateTag';
import TagList from '../TagList';
import DeleteTag from '../DeleteTag';
import UpdateTag from '../UpdateTag';

function Tag({ tag }) {
	const [childrenOpen, setChildrenOpen] = useState(false);
	const [updateFormOpen, setUpdateFormOpen] = useState(false);
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
