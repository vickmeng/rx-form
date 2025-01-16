import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@material-ui/core';
import ReactDOM from 'react-dom';

import './index.css';

import App from './App';

const theme = createTheme({
  palette: { primary: { main: '#4c00b7' }, secondary: { main: '#4c00b7' } },
  typography: {
    h2: { color: '#4c00b7', fontWeight: 100, fontSize: 42 },
    h4: { fontWeight: 100 },
    body1: {
      fontWeight: 100,
      textIndent: 32,
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter basename="/rx-form">
      <App />
    </BrowserRouter>
  </ThemeProvider>,

  document.getElementById('root')
);
