import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth';
import TweetService from './service/tweet';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AuthErrorEventBus } from './context/AuthContext';
import HttpClient from './network/http';

const baseURL = process.env.REACT_APP_BASE_URL;

const httpClient = new HttpClient(baseURL); // httpClient.basUrl, httpClient.fetch(url, options), where ${this.baseURL}${url}

const authErrorEventBus = new AuthErrorEventBus();
const authService = new AuthService();

const tweetService = new TweetService(httpClient); // tweetService.http, where http = httpClient, tweetServce.getTweet(), tweetService.postTweet(), etc.

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider
        authService={authService}
        authErrorEventBus={authErrorEventBus}
      >
        <App tweetService={tweetService} />
        // By convention, the entry point of a React application is usually .js (that is, index.js) 
        // instead of .jsx even though it contains React components.
        //  It could as well be .jsx. Any other JSX files usually have the .jsx extension.
        //  https://stackoverflow.com/questions/46169472/reactjs-js-vs-jsx
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
