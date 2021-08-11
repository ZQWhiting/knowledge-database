import ReactMarkdown from 'react-markdown';

function FormattedFile({ file = null, content, name }) {
	return file ? (
		<div>
			<div>{name}</div>
			<article>
				<ReactMarkdown>{content}</ReactMarkdown>
			</article>
		</div>
	) : (
		'pick a file'
	);
}

export default FormattedFile;
