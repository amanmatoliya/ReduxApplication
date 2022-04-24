import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPage from './components/Login'
import LogoutPage from './components/Logout'
// import MainPage from "./pages/Main";
import App from './components/index'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => Boolean(state.user))

  if (!loggedIn) {
    console.log('PrivateRoute: not logged in!')
  } else {
    console.log('PrivateRoute: logged in')
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !loggedIn ? (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default () => (
  <Router>
    <Switch>
      <Route name="login" path="/login" component={LoginPage} />

      <PrivateRoute name="logout" path="/logout" component={LogoutPage} />
      <PrivateRoute name="main" path="/main" component={App} />
      <Redirect from="/" to="main" />
    </Switch>
  </Router>
)
