const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type KeyValue {
        key: String!
        value: Boolean!
    }
	type File {
		name: String
		type: String
		content: String
		meta: [String]
	}
    input FileInput {
        name: String
		type: String
		content: String
		meta: [String]
    }
	type Query {
		allFiles: [File]
	}
	type Mutation {
		createFile(input: FileInput): File
	}
`;

module.exports = typeDefs;
