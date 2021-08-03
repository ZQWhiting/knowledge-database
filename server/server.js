const express = require('express');
const db = require('./config/connection');
const path = require('path');
const { ApolloServer } = require('apollo-server-express');
const schema = require('./schemas');

startServer();

async function startServer() {
	const server = new ApolloServer({ schema });
	await server.start();

	const app = express();
	app.use(express.urlencoded({ extended: false }));
	app.use(express.json());
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});

	server.applyMiddleware({ app });

	if (process.env.NODE_ENV === 'production') {
		app.use(express.static(path.join(__dirname, '../client/build')));
	}

	const PORT = process.env.PORT || 3001;
	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`API server running on port ${PORT}!`);
			console.log(
				`Test graphql at http://localhost:3001${server.graphqlPath}`
			);
		});
	});
};
