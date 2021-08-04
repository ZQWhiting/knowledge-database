import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, InMemoryCache } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Search from './pages/Search';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					{/* <Route exact path='/' component={} /> */}
					<Route exact path='/' component={Search} />
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
