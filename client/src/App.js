import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Search from './pages/Search'

function App() {
	return (
    <Router>
      <Switch>
        {/* <Route exact path='/' component={} /> */}
        <Route exact path='/' component={Search} />
      </Switch>
    </Router>
  )
}

export default App
