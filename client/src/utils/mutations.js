import gql from 'graphql-tag';

export const CREATE_TAG = gql`
	mutation createTag($createTagName: String!) {
		createTag(name: $createTagName) {
			_id
			name
		}
	}
`;

export const UPDATE_TAG = gql`
	mutation updateTag($updateTagName: String!, $updateTagId: ID!) {
		updateTag(name: $updateTagName, _id: $updateTagId) {
			_id
			name
		}
	}
`;

export const DELETE_TAG = gql`
	mutation deleteTag($deleteTagId: ID!) {
		deleteTag(_id: $deleteTagId) {
			_id
			name
		}
	}
`;

export const CREATE_FILE = gql`
	mutation createFile($createFileInput: createFileInput!) {
		createFile(input: $createFileInput) {
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
		$updateFileId: ID!
		$updateFileInput: updateFileInput!
	) {
		updateFile(_id: $updateFileId, input: $updateFileInput) {
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
	mutation deleteFile($deleteFileId: ID!) {
		deleteFile(_id: $deleteFileId) {
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
