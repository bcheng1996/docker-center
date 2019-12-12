import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import SideBar from './components/SideBar';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import PropertiesPage from './containers/PropertiesPage';

export default () => (
  <App>
    <SideBar>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route path={routes.PROPERTIES} component={PropertiesPage} />
        <Route exact path={routes.HOME} component={HomePage} />
      </Switch>
    </SideBar>
  </App>
);
