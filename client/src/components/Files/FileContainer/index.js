import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_FILES } from '../../../controllers/file';
import FileList from '../FileList';

function FileContainer() {
	const { data, loading, error } = useQuery(GET_ALL_FILES);

	if (loading) return '...loading';
	if (error) return error.message;

	const files = data?.files;

	return <FileList files={files} />;
}

export default FileContainer;
