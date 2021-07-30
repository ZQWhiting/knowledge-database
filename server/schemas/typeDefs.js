const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Tag {
		_id: ID
		name: String
	}
	type File {
		_id: ID
		name: String
		type: String
		content: String
		tags: [Tag]
	}
	input createFileInput {
		name: String!
		type: String!
		content: String
		tags: [ID]
	}
	input updateFileInput {
		name: String
		type: String
		content: String
		tags: [ID]
	}
	type Query {
		allFiles: [File]
		allTags: [Tag]
		tagsFiles(query: [ID]): [File]
	}
	type Mutation {
		createTag(name: String!): Tag
		updateTag(_id: ID!, name: String!): Tag
		deleteTag(_id: ID!): Tag
		createFile(input: createFileInput!): File
		updateFile(_id: ID!, input: updateFileInput!): File
		deleteFile(_id: ID!): File
	}
`;

module.exports = typeDefs;
