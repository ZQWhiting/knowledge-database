import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_TAGS } from '../../controllers/tag';

function TagList() {
	useQuery(GET_ALL_TAGS);
	return <div></div>;
}

export default TagList;
