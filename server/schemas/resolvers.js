const { File } = require('../models');
const path = require('path');
const fs = require('fs');

const resolvers = {
	Query: {
		allFiles: async () => {
			const files = await File.find();

			return files.map(({ name, type, content, meta }) => ({
				name,
				type,
				content,
				meta: Array.from(meta, ([key]) => key),
			}));
		},
	},
	Mutation: {
		createFile: async (parent, { input }) => {
			const { name, type, content, meta } = input;
			const map = new Map();
			meta.forEach((item) => map.set(item, true));

			const file = await File.create({ name, type, content, meta: map });

			return {
				...file,
				meta: Array.from(file.meta, ([key]) => key),
			};
		},
	},
};

module.exports = resolvers;
