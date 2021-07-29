const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type File {
		name: String
		type: String
		content: String
		meta: [String]
	}
	type Query {
		files: [File]
	}
`;

module.exports = typeDefs;
