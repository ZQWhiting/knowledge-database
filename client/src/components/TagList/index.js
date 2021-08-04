import classNames from 'classnames';
import Tag from '../Tag';
import './style.scss';

function TagList({ tags }) {
	return (
		<div className={classNames(tags && 'tab')}>
			{tags.map((tag) => (
				<Tag tag={tag} key={tag._id} />
			))}
		</div>
	);
}

export default TagList;
