import gql from 'graphql-tag';
import { FILE_FIELDS } from './fragments';

export const GET_ALL_FILES = gql`
	${FILE_FIELDS}
	query files {
		files {
			...FileFields
		}
	}
`;

export const GET_TAGGED_FILES = gql`
	${FILE_FIELDS}
	query taggedFiles($query: [ID]) {
		taggedFiles(query: $query) {
			...FileFields
		}
	}
`;

export const CREATE_FILE = gql`
	${FILE_FIELDS}
	mutation createFile(
		$name: String!
		$type: String!
		$content: String
		$tags: [ID]
	) {
		createFile(name: $name, type: $type, content: $content, tags: $tags) {
			...FileFields
		}
	}
`;

export const UPDATE_FILE = gql`
	${FILE_FIELDS}
	mutation updateFile(
		$_id: ID!
		$name: String
		$type: String
		$content: String
		$tags: [ID]
	) {
		updateFile(
			_id: $_id
			name: $name
			type: $type
			content: $content
			tags: $tags
		) {
			...FileFields
		}
	}
`;

export const DELETE_FILE = gql`
	${FILE_FIELDS}
	mutation deleteFile($_id: ID!) {
		deleteFile(_id: $_id) {
			...FileFields
		}
	}
`;
