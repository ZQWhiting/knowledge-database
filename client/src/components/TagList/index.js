import { useQuery } from '@apollo/react-hooks';
import classNames from 'classnames';
import { GET_TAGS } from '../../controllers/tag';
import Tag from '../Tag';
import './style.scss';

function TagList({ tags }) {
	const { loading, data, error } = useQuery(GET_TAGS, {
		enabled: tags && tags.length,
	});

	if (tags && tags.length) data.tags = tags;

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<div className={classNames(tags && 'tab')}>
			{data?.tags && data?.tags.map((tag) => <Tag tag={tag} />)}
		</div>
	);
}

export default TagList;
