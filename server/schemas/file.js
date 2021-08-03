const { UserInputError } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const { File } = require('../models');

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
	extend type Query {
		files: [File]
		file(id: ID!): File
		taggedFiles(query: [ID]): [File]
	}
	extend type Mutation {
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

const resolvers = {
	Query: {
		files: async () => File.find().populate('tags'),
		file: async (parent, { id }) => {
			const file = await File.findById(id).populate('tags');
			if (!file) throw new UserInputError('No match for ID');
			return file;
		},
		taggedFiles: async (parent, { query }) =>
			await File.find().where('tags').all(query).populate('tags'),
	},
	Mutation: {
		createFile: async (parent, input) =>
			await File.create(input).populate('tags'),

		updateFile: async (parent, input) => {
			const file = await File.findByIdAndUpdate(input.id, input, {
				new: true,
			});

			if (!file) throw new UserInputError('No match for ID');

			return File.populate(file, { path: 'tags' });
		},
		deleteFile: async (parent, { id }) => {
			const file = await File.findByIdAndDelete(id).populate('tags');

			if (!file) throw new UserInputError('No match for ID');

			return file;
		},
	},
};

module.exports = { typeDefs, resolvers };
