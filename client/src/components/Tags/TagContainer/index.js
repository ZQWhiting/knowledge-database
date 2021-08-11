import { useQuery } from '@apollo/react-hooks';
import { GET_TAGS } from '../../../controllers/tag';
import CreateTag from '../CreateTag';
import TagList from '../TagList';
import './style.scss';

function TagContainer() {
	const { data, loading, error } = useQuery(GET_TAGS);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<>
			<TagList tags={data.tags} />
			<div>
				<CreateTag />
			</div>
		</>
	);
}

export default TagContainer;