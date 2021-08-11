import gql from 'graphql-tag';

export const TAG_FIELDS = gql`
	fragment TagFields on Tag {
		_id
		name
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
			name
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
	}
`;