import React from 'react';
import { Route, Switch } from 'react-router-dom'
import HomeIndex from '../home'
import ProfileIndex from '../profile'
import SignInForm from '../signin/form'
import SignUpForm from '../signup/form'
import { HOME, PROFILE, SIGN_IN, SIGN_UP } from '../../stores/UrlRouter'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path={HOME.route}
        exact
        render={(routerProps) => <HomeIndex {...{...routerProps, userId: 1}} />}
      />
      <Route path={PROFILE.route} exact component={ProfileIndex} />
      <Route path={SIGN_IN.route} exact component={SignInForm} />
      <Route path={SIGN_UP.route} exact component={SignUpForm} />
    </Switch>
    
  );
}

export default Routes;
