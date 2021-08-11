import { useApolloClient } from '@apollo/react-hooks';
import { TAG_PARENTS } from '../../../controllers/fragments';
import { SET_TAGS } from '../../../utils/actions';
import { useStoreContext } from '../../../utils/store';
import DeleteFile from '../DeleteFile';

function ShortFile({ file, setActiveFile }) {
	const [, dispatch] = useStoreContext();
	const client = useApolloClient();
	const activeHandler = async () => {
		const tags = file.tags
			.map((tag) => {
				const data = client.readFragment({
					id: client.cache.identify(tag),
					fragment: TAG_PARENTS,
				});
				return data;
			})
			.filter((tag) => tag);

		dispatch({
			type: SET_TAGS,
			tags: tags,
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
