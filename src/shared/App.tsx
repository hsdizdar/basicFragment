import 'reflect-metadata';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import { Provider } from '../providers/ioc.react';
import ErrorBoundary from '../errorBoundary';
import NotFound from './NotFound';
import routes from './routes';
import client from '../state/config';
import { container } from '../providers/ioc';

const App = (props) => (
  <Provider container={container}>
    <ApolloProvider client={client}>
      <ErrorBoundary>
        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => <Component {...props} {...rest} />} />
          ))}
          <Route render={(props) => <NotFound {...props} />} />
        </Switch>
      </ErrorBoundary>
    </ApolloProvider>
  </Provider>
);

export default App;
