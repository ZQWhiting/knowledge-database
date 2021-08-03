import gql from 'graphql-tag';

export const GET_ALL_FILES = gql`
	query files {
		allFiles {
			_id
			name
			type
			content
			tags {
				name
			}
		}
	}
`;

export const GET_TAGGED_FILES = gql`
	query tagFiles($query: [ID]) {
		tagsFiles(query: $query) {
			_id
			name
			type
			content
			tags {
				name
			}
		}
	}
`;

export const CREATE_FILE = gql`
	mutation createFile($name: String!, $type: String!, $content: String, $tags: [ID]) {
		createFile(name: $name, type: $type, content: $content, tags: $tags) {
			_id
			name
			type
			content
			tags {
				name
			}
		}
	}
`;

export const UPDATE_FILE = gql`
	mutation updateFile($id: ID!, $name: String, $type: String, $content: String, $tags: [ID]) {
		updateFile(id: $id, name: $name, type: $type, content: $content, tags: $tags) {
			_id
			name
			type
			content
			tags {
				name
			}
		}
	}
`;

export const DELETE_FILE = gql`
	mutation deleteFile($id: ID!) {
		deleteFile(id: $id) {
			_id
			name
			type
			content
			tags {
				name
			}
		}
	}
`;
