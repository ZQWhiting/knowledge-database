const { UserInputError } = require('apollo-server-express');
const { gql } = require('apollo-server-express');
const { Tag } = require('../models');
const nested_populate = require('../utils/helpers/nested_populate');

const typeDefs = gql`
	type Tag {
		_id: ID
		name: String
		children: [Tag]
	}
	extend type Query {
		tags: [Tag]
		tag(id: ID!): Tag
	}
	extend type Mutation {
		createTag(name: String!, parent_id: ID): Tag
		updateTag(id: ID!, name: String, children: [ID]): Tag
		deleteTag(id: ID!): Tag
	}
`;
const resolvers = {
	Query: {
		tags: async () => Tag.find().populate(nested_populate('children', 5)),
		tag: async (p, { id }) => {
			const tag = await Tag.findById(id);

			if (!tag) throw new UserInputError('No match for ID');

			return tag;
		},
	},
	Mutation: {
		createTag: async (parent, { name, parent_id }) => {
			const tag = await Tag.create({ name });
			await Tag.findByIdAndUpdate(parent_id, {
				$addToSet: { children: tag._id },
			});

			return tag;
		},
		updateTag: async (parent, input) => {
			const tag = await Tag.findByIdAndUpdate(
				input.id,
				{ $set: input },
				{ new: true }
			);

			if (!tag) throw new UserInputError('No match for ID');

			return await Tag.populate(tag, nested_populate('children', 5));
		},
		deleteTag: async (parent, { id }) => {
			const tag = await Tag.findByIdAndDelete(id).populate('children');

			if (!tag) throw new UserInputError('No match for ID');

			return tag;
		},
	},
};

module.exports = { typeDefs, resolvers };
