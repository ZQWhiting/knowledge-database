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

export const GET_ALL_TAGS = gql`
	query tags {
		allTags {
			_id
			name
		}
	}
`;

export const GET_TAGGED_FILES = gql`
	query tagFiles($tagsFilesQuery: [ID]) {
		tagsFiles(query: $tagsFilesQuery) {
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
