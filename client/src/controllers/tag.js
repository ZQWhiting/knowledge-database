import gql from 'graphql-tag';

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
	query tags {
		tags ${recursive_tag_return}
	}
`;

export const GET_TAG = gql`
	query tag($id: ID!) {
		tag(id: $id) ${recursive_tag_return}
	}
`;

export const CREATE_TAG = gql`
	mutation createTag($name: String!, $children: ID) {
		createTag(name: $name, children: $children) ${recursive_tag_return}
	}
`;

export const UPDATE_TAG = gql`
	mutation updateTag($id: ID!, $name: String, $children: ID) {
		updateTag(id: $id, name: $name, children: $children) ${recursive_tag_return}
	}
`;

export const DELETE_TAG = gql`
	mutation deleteTag($id: ID!) {
		deleteTag(id: $id) ${recursive_tag_return}
	}
`;
