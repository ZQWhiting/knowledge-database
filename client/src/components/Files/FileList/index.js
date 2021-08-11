import { useEffect, useState } from 'react';
import { useStoreContext } from '../../../utils/store';
import ShortFile from '../ShortFile';

function FileList({ files }) {
	const [state] = useStoreContext();
	const [filteredFiles, setFilteredFiles] = useState(filterHandler(files));

	useEffect(() => {
		setFilteredFiles(filterHandler(files));
		// eslint-disable-next-line
	}, [state.searchTags, files]);

	return (
		<>
			{filteredFiles.map((file) => (
				<ShortFile key={file._id} file={file} />
			))}
		</>
	);

	function filterHandler(files) {
		return files.filter((file) => {
			for (let i = 0; i < state.searchTags.length; i++)
				if (file.tags.some((tag) => tag._id === state.searchTags[i]))
					return false;
			return true;
		});
	}
}

export default FileList;
