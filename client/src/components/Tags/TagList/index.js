
import Tag from '../Tag';
import './style.scss';

function TagList({ tags }) {
	return (
		<>
			{tags.map((tag) => (
				<Tag tag={tag} key={tag._id} />
			))}
		</>
	);
}

export default TagList;
