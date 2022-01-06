import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import { RUIProvider } from './components/RUIProvider';
import { AboutPage } from './pages/about';
import { ListPage } from './pages/list';
import { MapPage } from './pages/map';
import routes from './routes';

export default (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <RUIProvider>
        <Switch>
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <MapPage {...routerProps} />}
            exact
            path={routes.map}
          />
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <ListPage {...routerProps} />}
            exact
            path={routes.list}
          />
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <AboutPage {...routerProps} />}
            exact
            path={routes.about}
          />
        </Switch>
      </RUIProvider>
    </Router>
  </Provider>
);
