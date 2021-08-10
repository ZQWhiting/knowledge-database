import { useEffect, useState } from 'react';
import { useStoreContext } from '../../../utils/store';

function FileList({ files }) {
	const [state] = useStoreContext();
	const [filteredFiles, setFilteredFiles] = useState(
		files.filter(filterHandler)
	);

	useEffect(() => {
		setFilteredFiles(files.filter(filterHandler));
		// eslint-disable-next-line
	}, [state.searchTags, files]);

	return (
		<>
			{filteredFiles.map((file) => (
				<div key={file._id}>{file.name}</div>
			))}
		</>
	);

	function filterHandler(file) {
		for (let i = 0; i < state.searchTags.length; i++) {
			const searchTag = state.searchTags[i];
			const includes = file.tags.some((tag) => tag._id === searchTag);
			if (!includes) return false;
		}
		return true;
	}
}

export default FileList;
