import ReactMarkdown from 'react-markdown';

function FormattedFile({ file = null }) {
	return file ? (
		<div>
			<div>{file.name}</div>
			<ReactMarkdown>{file.content}</ReactMarkdown>
		</div>
	) : (
		'pick a file'
	);
}

export default FormattedFile;
