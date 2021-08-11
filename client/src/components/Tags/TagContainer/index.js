import { useQuery } from '@apollo/react-hooks';
import { GET_TAG_LIST } from '../../../controllers/tag';
import CreateTag from '../CreateTag';
import TagList from '../TagList';
import './style.scss';

function TagContainer() {
	const { data, loading, error } = useQuery(GET_TAG_LIST);

	if (loading) return 'Loading...';
	if (error) return `Error! ${error.message}`;

	return (
		<>
			<TagList tags={data.tagList} />
			<div>
				<CreateTag />
			</div>
		</>
	);
}

export default TagContainer;
