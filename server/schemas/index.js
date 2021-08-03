const { merge } = require('lodash');
const { resolvers: fileResolvers, typeDefs: fileTypeDefs } = require('./tag');
const { resolvers: tagResolvers, typeDefs: tagTypeDefs } = require('./file');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typeDef = `
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;
const resolvers = {};

module.exports = makeExecutableSchema({
	typeDefs: [typeDef, fileTypeDefs, tagTypeDefs],
	resolvers: merge(resolvers, fileResolvers, tagResolvers),
});
