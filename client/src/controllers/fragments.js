import gql from 'graphql-tag';

export const TAG_PARENTS = gql`
	fragment TagParents on Tag {
		_id
		parent {
			_id
			parent {
				_id
				parent {
					_id
					parent {
						_id
					}
				}
			}
		}
	}
`;

export const TAG_FIELDS = gql`
	${TAG_PARENTS}
	fragment TagFields on Tag {
		_id
		name
		...TagParents
	}
`;

export const FILE_FIELDS = gql`
	fragment FileFields on File {
		_id
		name
		type
		content
		tags {
			_id
		}
	}
`;