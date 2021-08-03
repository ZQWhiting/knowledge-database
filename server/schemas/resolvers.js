const { File, Tag } = require('../models');
const { UserInputError } = require('apollo-server-express');
const nested_populate = require('../utils/helpers/nested_populate');

const resolvers = {
	Query: {
		tags: async () => Tag.find(),
		tag: async (p, { id }) => {
			const tag = await Tag.findById(id);
			if (!tag) throw new UserInputError('No match for ID');
			return tag;
		},
		files: async () => File.find().populate('tags'),
		file: async (p, { id }) => {
			const file = await File.findById(id).populate('tags');
			if (!file) throw new UserInputError('No match for ID');
			return file;
		},
		taggedFiles: async (p, { query }) =>
			await File.find().where('tags').all(query).populate('tags'),
	},
	Mutation: {
		createTag: async (p, input) => {
			const tag = await Tag.create(input);

			return await Tag.populate(tag, nested_populate('children', 5));
		},
		updateTag: async (p, input) => {
			const tag = await Tag.findByIdAndUpdate(
				input.id,
				{ $set: input },
				{ new: true }
			);

			if (!tag) throw new UserInputError('No match for ID');

			return await Tag.populate(tag, nested_populate('children', 5));
		},
		deleteTag: async (p, { id }) => {
			const tag = await Tag.findByIdAndDelete(id).populate('children');

			if (!tag) throw new UserInputError('No match for ID');

			return tag;
		},
		createFile: async (p, input) => {
			const file = await File.create(input).populate('tags');

			return file;
		},
		updateFile: async (p, input) => {
			const file = await File.findByIdAndUpdate(input.id, input, {
				new: true,
			});

			if (!file) throw new UserInputError('No match for ID');

			return File.populate(file, { path: 'tags' });
		},
		deleteFile: async (p, { id }) => {
			const file = await File.findByIdAndDelete(id).populate('tags');

			if (!file) throw new UserInputError('No match for ID');

			return file;
		},
	},
};

module.exports = resolvers;
