const { File } = require('../models');
const path = require('path');
const fs = require('fs');

const resolvers = {
	Query: {
		files: async () => {
			const files = await File.find();

			return files;
		},
	},
};

module.exports = resolvers;
