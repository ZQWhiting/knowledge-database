import ReactMarkdown from 'react-markdown';

function FormattedFile({ file = null, content, name }) {
	return file ? (
		<div>
			<div>{name}</div>
			<ReactMarkdown>{content}</ReactMarkdown>
		</div>
	) : (
		'pick a file'
	);
}

export default FormattedFile;
