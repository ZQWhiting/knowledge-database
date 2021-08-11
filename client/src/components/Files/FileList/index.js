import { useEffect, useState } from 'react';
import { useStoreContext } from '../../../utils/store';
import ShortFile from '../ShortFile';

function FileList({ files, setActiveFile }) {
	const [state] = useStoreContext();
	const [filteredFiles, setFilteredFiles] = useState(
		state.searchTags.length ? filterHandler(files) : files
	);

	useEffect(() => {
		setFilteredFiles(
			state.searchTags.length ? filterHandler(files) : files
		);
		// eslint-disable-next-line
	}, [state.searchTags, files]);

	return (
		<>
			{filteredFiles.map((file) => (
				<ShortFile
					key={file._id}
					file={file}
					setActiveFile={setActiveFile}
				/>
			))}
		</>
	);

	function filterHandler(files) {
		return files.filter((file) => {
			for (let i = 0; i < state.searchTags.length; i++)
				if (file.tags.some((tag) => tag._id === state.searchTags[i]))
					return true;
			return false;
		});
	}
}

export default FileList;
