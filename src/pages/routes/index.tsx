import React from 'react';
import { Route, Switch } from 'react-router-dom'
import HomeIndex from '../home'
import ProfileIndex from '../profile'
import { HOME, PROFILE } from '../../stores/UrlRouter'

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path={HOME.route}
        exact
        render={(routerProps) => <HomeIndex {...{...routerProps, userId: 1}} />}
      />
      <Route path={PROFILE.route} exact component={ProfileIndex} />
    </Switch>
    
  );
}

export default Routes;
