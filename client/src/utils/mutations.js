import gql from 'graphql-tag';

export const CREATE_TAG = gql`
	mutation createTag($name: String!, $parent: ID) {
		createTag(name: $name, parent: $parent) {
			_id
			name
			parent {
				_id
			}
		}
	}
`;

export const UPDATE_TAG = gql`
	mutation updateTag($id: ID!, $name: String, $parent: ID) {
		updateTag(id: $id, name: $name, parent: $parent) {
			_id
			name
			parent {
				_id
			}
		}
	}
`;

export const DELETE_TAG = gql`
	mutation deleteTag($id: ID!) {
		deleteTag(id: $id) {
			_id
			name
			parent {
				_id
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
