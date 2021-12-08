import React from 'react';
import { Provider } from 'react-redux';
import {
  Route,
  Router,
  Switch,
} from 'react-router-dom';
import { RUIProvider } from './components/RUIProvider';
import { IndexPage } from './pages/index';
import routes from './routes';

export default (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <RUIProvider>
        <Switch>
          <Route
            // eslint-disable-next-line react/no-children-prop
            children={(routerProps) => <IndexPage {...routerProps} />}
            exact
            path={routes.index}
          />
        </Switch>
      </RUIProvider>
    </Router>
  </Provider>
);
