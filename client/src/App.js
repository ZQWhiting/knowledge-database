import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';

import Search from './pages/Search';

const client = new ApolloClient({
	uri: '/graphql',
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
