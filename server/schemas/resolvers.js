const { File, Tag } = require('../models');

const resolvers = {
	Query: {
		allTags: async () => {
			const tags = await Tag.find();

			return tags;
		},
		allFiles: async () => {
			const files = await File.find().populate('tags');

			return files;
		},
		tagsFiles: async (parent, { query }) => {
			const files = await File.find()
				.where('tags')
				.all(query)
				.populate('tags');

			return files;
		},
	},
	Mutation: {
		createTag: async (parent, { name }) => {
			const tag = await Tag.create({ name });

			return tag;
		},
		updateTag: async (parent, { _id, name }) => {
			const tag = await Tag.findByIdAndUpdate(
				_id,
				{ name },
				{ new: true }
			);

			return tag;
		},
		deleteTag: async (parent, { _id }) => {
			const tag = await Tag.findByIdAndDelete(_id);

			return tag;
		},
		createFile: async (parent, { input }) => {
			const file = await File.create(input);

			return file;
		},
		updateFile: async (parent, { _id, input }) => {
			const file = await File.findByIdAndUpdate(_id, input, {
				new: true,
			}).populate('tags');
			return file;
		},
		deleteFile: async (parent, { _id }) => {
			const file = await File.findByIdAndDelete(_id).populate('tags');

			return file;
		},
	},
};

module.exports = resolvers;
