import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, InMemoryCache } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Search from './pages/Search';

import { StoreProvider } from './utils/store';

const client = new ApolloClient({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<StoreProvider>
					<Switch>
						{/* <Route exact path='/' component={} /> */}
						<Route exact path='/' component={Search} />
					</Switch>
				</StoreProvider>
			</Router>
		</ApolloProvider>
	);
}

export default App;
