import 'babel-polyfill';
import { Provider } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './styles/styles.scss';
import React from 'react';
import { render } from 'react-dom';
import HomePage from './components/home/HomePage';

/* eslint-disable import/no-named-as-default */
import configureStore from './store/configureStore';

const store = configureStore();
// ----------------------------------------------------------------------------------------------------------------------------------
render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('app')
);


