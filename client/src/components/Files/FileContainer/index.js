import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { GET_ALL_FILES } from '../../../controllers/file';
import PostFile from '../PostFile';
import FileList from '../FileList';

function FileContainer() {
	const { data, loading, error } = useQuery(GET_ALL_FILES);
	const [activeFile, setActiveFile] = useState(null);

	if (loading) return '...loading';
	if (error) return error.message;

	const files = data?.files;

	return (
		<div>
			<PostFile file={activeFile} setActiveFile={setActiveFile} />
			<FileList files={files} setActiveFile={setActiveFile} />
		</div>
	);
}

export default FileContainer;
