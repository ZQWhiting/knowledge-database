const { File } = require('../models');

const resolvers = {
	Query: {
		allFiles: async () => {
			const files = await File.find();

			return files;
		},
		metaFiles: async (parent, { query }) => {
			const files = await File.find().where('meta').all(query);

			return files;
		},
	},
	Mutation: {
		createFile: async (parent, { input }) => {
			const file = await File.create(input);

			return file;
		},
	},
};

module.exports = resolvers;
