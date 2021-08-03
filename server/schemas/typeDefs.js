const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type Tag {
		_id: ID
		name: String
		parent: Tag
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
	input updateTagInput {
		name: String
		parent: ID
	}
	type Query {
		files: [File]
		file(id: ID!): File
		tags: [Tag]
		tag(id: ID!): Tag
		taggedFiles(query: [ID]): [File]
	}
	type Mutation {
		createTag(name: String!, parent: ID): Tag
		updateTag(id: ID!, name: String, parent: ID): Tag
		deleteTag(id: ID!): Tag
		createFile(
			name: String!
			type: String!
			content: String
			tags: [ID]
		): File
		updateFile(
			id: ID!
			name: String
			type: String
			content: String
			tags: [ID]
		): File
		deleteFile(id: ID!): File
	}
`;

module.exports = typeDefs;
