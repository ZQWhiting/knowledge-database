import gql from 'graphql-tag';

export const TAG_FIELDS = gql`
	fragment TagFields on Tag {
		_id
		name
	}
`;
