import { SET_TAGS } from '../../../utils/actions';
import { useStoreContext } from '../../../utils/store';
import DeleteFile from '../DeleteFile';

function ShortFile({ file, setActiveFile }) {
	const [, dispatch] = useStoreContext();
	const activeHandler = () => {
		dispatch({
			type: SET_TAGS,
			tags: file.tags,
		});
		setActiveFile(file);
	};
	return (
		<div className='short-file'>
			<div>{file.name}</div>
			<div>{file.content.substring(0, 15)}...</div>
			<button onClick={activeHandler}>Set Active</button>
			<DeleteFile file={file} />
		</div>
	);
}

export default ShortFile;
