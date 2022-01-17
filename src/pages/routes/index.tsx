import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import HomeIndex from '../home'
import ProfileIndex from '../profile'
import SignInForm from '../signin/form'
import SignUpForm from '../signup/form'
import { HOME, PROFILE, SIGN_IN, SIGN_UP } from '../../stores/UrlRouter'
import { checkUser } from '../../utils/Utils'
import { observer } from 'mobx-react'

@observer
class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          path={HOME.route}
          exact
          render={() =>
            checkUser() ? (
              <Route
                path={HOME.route}
                exact
                render={(routeProps) => <HomeIndex {...routeProps} />}
              />
            ) : (
              <Redirect to={SIGN_IN.route} />
            )
          }
        />
        <Route
          path={PROFILE.route}
          exact
          render={() =>
            checkUser() ? (
              <Route
                path={PROFILE.route}
                exact
                render={(routeProps) => <ProfileIndex {...routeProps} />}
              />
            ) : (
              <Redirect to={SIGN_IN.route} />
            )
          }
        />
        <Route
          path={SIGN_IN.route}
          exact
          render={() =>
            checkUser() ? (
              <Redirect to={HOME.route} />
            ) : (
              <Route
                path={SIGN_IN.route}
                exact
                render={(routeProps) => <SignInForm {...routeProps} />}
              />
            )
          }
        />
        <Route
          path={SIGN_UP.route}
          exact
          render={() =>
            checkUser() ? (
              <Redirect to={HOME.route} />
            ) : (
              <Route
                path={SIGN_UP.route}
                exact
                render={(routeProps) => <SignUpForm {...routeProps} />}
              />
            )
          }
        />
      </Switch>
    )
  }
}

export default Routes
