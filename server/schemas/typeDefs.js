const { gql } = require('apollo-server-express');

const typeDefs = gql`
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
		metaFiles(query: [String]): [File]
	}
	type Mutation {
		createFile(input: FileInput): File
		updateFile(input: FileInput): File
		deleteFile(name: String): File
	}
`;

module.exports = typeDefs;
