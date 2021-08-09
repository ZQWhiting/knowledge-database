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
		file(_id: ID!): File
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
			_id: ID!
			name: String
			type: String
			content: String
			tags: [ID]
		): File
		deleteFile(_id: ID!): File
	}
`;

const resolvers = {
	Query: {
		files: async () => File.find().populate('tags'),
		file: async (parent, { _id }) => {
			const file = await File.findById(_id).populate('tags');
			if (!file) throw new UserInputError('No match for ID');
			return file;
		},
		taggedFiles: async (parent, { query }) =>
			await File.find().where('tags').all(query).populate('tags'),
	},
	Mutation: {
		createFile: async (parent, input) => await File.create(input),

		updateFile: async (parent, input) => {
			const file = await File.findByIdAndUpdate(input._id, input, {
				new: true,
			});

			if (!file) throw new UserInputError('No match for ID');

			return File.populate(file, { path: 'tags' });
		},
		deleteFile: async (parent, { _id }) => {
			const file = await File.findByIdAndDelete(_id).populate('tags');

			if (!file) throw new UserInputError('No match for ID');

			return file;
		},
	},
};

module.exports = { typeDefs, resolvers };
