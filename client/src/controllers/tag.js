import gql from 'graphql-tag';

export const GET_ALL_TAGS = gql`
	query tags {
		tags {
			_id
			name
			children {
				_id
			}
		}
	}
`;

export const CREATE_TAG = gql`
	mutation createTag($name: String!, $children: ID) {
		createTag(name: $name, children: $children) {
			_id
			name
			children {
				_id
			}
		}
	}
`;

export const UPDATE_TAG = gql`
	mutation updateTag($id: ID!, $name: String, $children: ID) {
		updateTag(id: $id, name: $name, children: $children) {
			_id
			name
			children {
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
			children {
				_id
			}
		}
	}
`;
