import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './shared/store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/header'
import Login from './login/'
import Items from './items/'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path={'/'} component={App} />
          <Route path={'/login'} component={Login} />
          <Route path={'/items'} component={Items} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
)
