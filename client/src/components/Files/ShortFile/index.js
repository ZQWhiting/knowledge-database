function ShortFile({ file }) {
	return (
		<div className='short-file'>
			<div>{file.name}</div>
			<div>{file.content.substring(0, 15)}...</div>
		</div>
	);
}

export default ShortFile;
