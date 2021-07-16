import './App.global.css';

import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core';

import MainPage from '../pages/MainPage';
import { store } from './store';
import theme from './themes/themeBlue';

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MainPage />
        </ThemeProvider>
      </Provider>
    </Router>
  );
};

export default App;
