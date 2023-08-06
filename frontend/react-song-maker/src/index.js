import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './config/graphQLConfig';
import store from './redux/store';
import { Provider } from 'react-redux';

//Styles
import './assets/css/styles.css';
import './modules/songMaker/assets/css/styles.css';
import './modules/navigation/assets/css/styles.css';
import './modules/auth/assets/css/styles.css';

//Translations
import './config/i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <HashRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HashRouter>
    </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
