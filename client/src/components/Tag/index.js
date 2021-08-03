import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import CreateTag from '../CreateTag';
import TagList from '../TagList';

function Tag({ tag }) {
	const [open, setOpen] = useState(false);
	return (
		<div key={tag._id}>
			<div>
				<span onClick={() => setOpen(!open)}>
					<FontAwesomeIcon icon={open ? faAngleUp : faAngleDown} />
				</span>
				{tag.name}
			</div>
			{open && (
				<>
					{!!tag.children.length && <TagList tags={tag.children} />}
					<CreateTag id={tag._id} />
				</>
			)}
		</div>
	);
}

export default Tag;
