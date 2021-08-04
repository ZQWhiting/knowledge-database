import gql from 'graphql-tag';
import { TAG_FIELDS } from './fragments';

const recursive_tag_return = `{
	...TagFields
	children {
		...TagFields
		children {
			...TagFields
			children {
				...TagFields
				children {
					...TagFields
				}
			}
		}
	}
}`;

export const GET_ALL_TAGS = gql`
	${TAG_FIELDS}
	query allTags {
		allTags ${recursive_tag_return}
	}
`;
export const GET_TAGS = gql`
	${TAG_FIELDS}
	query tags($parent_id: ID) {
		tags(parent_id: $parent_id) ${recursive_tag_return}
	}
`;

export const GET_TAG = gql`
	${TAG_FIELDS}
	query tag($id: ID!) {
		tag(id: $id) ${recursive_tag_return}
	}
`;

export const CREATE_TAG = gql`
	${TAG_FIELDS}
	mutation createTag($name: String!, $parent_id: ID) {
		createTag(name: $name, parent_id: $parent_id) {
			...TagFields
			parent {
				_id
			}
			children {
				_id
			}
		}
	}
`;

export const UPDATE_TAG = gql`
	${TAG_FIELDS}
	mutation updateTag($id: ID!, $name: String, $children: ID) {
		updateTag(id: $id, name: $name, children: $children) ${recursive_tag_return}
	}
`;

export const DELETE_TAG = gql`
	${TAG_FIELDS}
	mutation deleteTag($id: ID!) {
		deleteTag(id: $id) {
			...TagFields
			parent {
				_id
			}
			children {
				_id
			}
		}
	}
`;
