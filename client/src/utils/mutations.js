import gql from 'graphql-tag';

export const MUTATE_CREATE_TAG = gql`
	mutation createTag($createTagName: String!) {
		createTag(name: $createTagName) {
			_id
			name
		}
	}
`;

export const MUTATE_UPDATE_TAG = gql`
	mutation updateTag($updateTagName: String!, $updateTagId: ID!) {
		updateTag(name: $updateTagName, _id: $updateTagId) {
			_id
			name
		}
	}
`;

export const MUTATE_DELETE_TAG = gql`
	mutation deleteTag($deleteTagId: ID!) {
		deleteTag(_id: $deleteTagId) {
			_id
			name
		}
	}
`;

export const MUTATE_CREATE_FILE = gql`
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

export const MUTATE_UPDATE_FILE = gql`
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

export const MUTATE_DELETE_FILE = gql`
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
