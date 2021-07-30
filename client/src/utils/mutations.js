import gql from 'graphql-tag';

export const CREATE_TAG = gql`
	mutation createTag($name: String!) {
		createTag(name: $name) {
			_id
			name
		}
	}
`;

export const UPDATE_TAG = gql`
	mutation updateTag($name: String!, $id: ID!) {
		updateTag(name: $name, id: $id) {
			_id
			name
		}
	}
`;

export const DELETE_TAG = gql`
	mutation deleteTag($id: ID!) {
		deleteTag(id: $id) {
			_id
			name
		}
	}
`;

export const CREATE_FILE = gql`
	mutation createFile($input: createFileInput!) {
		createFile(input: $input) {
			_id
			name
			type
			content
			tags {
				_id
				name
			}
		}
	}
`;

export const UPDATE_FILE = gql`
	mutation updateFile(
		$id: ID!
		$input: updateFileInput!
	) {
		updateFile(id: $id, input: $input) {
			_id
			name
			type
			content
			tags {
				_id
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
				_id
				name
			}
		}
	}
`;
