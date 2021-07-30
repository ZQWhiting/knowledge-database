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
		tagsFiles: async (p, { query }) => {
			const files = await File.find()
				.where('tags')
				.all(query)
				.populate('tags');

			return files;
		},
	},
	Mutation: {
		createTag: async (p, input) => {
			const tag = await Tag.create(input);

			return await Tag.populate(tag, { path: 'parent' });
		},
		updateTag: async (p, input) => {
			const tag = await Tag.findByIdAndUpdate(
				input.id,
				{ $set: input },
				{ new: true }
			);

			return await Tag.populate(tag, { path: 'parent' });
		},
		deleteTag: async (p, { id }) => {
			const tag = await Tag.findByIdAndDelete(id);
			await Tag.updateMany({ parent: tag._id }, { parent: tag.parent });

			return tag;
		},
		createFile: async (p, input) => {
			const file = await File.create(input);

			return file;
		},
		updateFile: async (p, input) => {
			const file = await File.findByIdAndUpdate(input.id, input, {
				new: true,
			}).populate('tags');
			return file;
		},
		deleteFile: async (p, { id }) => {
			const file = await File.findByIdAndDelete(id).populate('tags');

			return file;
		},
	},
};

module.exports = resolvers;
