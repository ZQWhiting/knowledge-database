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
		allTags: [Tag]
		tag(_id: ID!): Tag
		tagList(parent_id: ID): [Tag]
		tags(_ids: [ID]): [Tag]
	}
	extend type Mutation {
		createTag(name: String!, parent_id: ID): Tag
		updateTagName(_id: ID!, name: String): Tag
		deleteTag(_id: ID!): Tag
	}
`;
const resolvers = {
	Query: {
		allTags: async () =>
			Tag.find().populate(nested_populate('children', 5)),
		tagList: async (p, { parent_id = null }) =>
			Tag.find({ parent: parent_id })
				.populate(nested_populate('children', 5))
				.populate(nested_populate('parent', 5)),
		tags: async (p, { _ids }) =>
			Tag.find({ _id: { $in: _ids } }).populate(
				nested_populate('children', 5)
			),
		tag: async (p, { _id }) => {
			const tag = await Tag.findById(_id);

			if (!tag) throw new UserInputError('No match for ID');

			return Tag.populate(tag, nested_populate('children', 5));
		},
	},
	Mutation: {
		createTag: async (parent, { name, parent_id }) => {
			const tag = await Tag.create({ name, parent: parent_id });
			await Tag.findByIdAndUpdate(parent_id, {
				$addToSet: { children: tag._id },
			});

			return tag;
		},
		updateTagName: async (parent, { _id, name }) => {
			const tag = await Tag.findByIdAndUpdate(
				_id,
				{ $set: { name } },
				{ new: true }
			);

			if (!tag) throw new UserInputError('No match for ID');

			return tag;
		},
		deleteTag: async (parent, { _id }) => {
			const tag = await Tag.findById(_id);
			if (!tag) throw new UserInputError('No match for ID');

			tag.deleteOne();

			return tag;
		},
	},
};

module.exports = { typeDefs, resolvers };
