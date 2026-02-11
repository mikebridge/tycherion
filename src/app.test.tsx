import React from 'react';
import { render } from '@testing-library/react';
import App from './app';
import {HashRouter as Router} from 'react-router-dom';

test('renders app', () => {
  render(
      <Router>
        <App />
      </Router>
  );
});
