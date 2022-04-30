import React from 'react';
import ReactDOM from 'react-dom/client';
import Routers from './router';
import "./assets/styles/main.scss";
// import { StateProvider } from './contexts';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import 'bootstrap/dist/css/bootstrap.min.css';
const root = ReactDOM.createRoot(document.getElementById("root"));

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})


root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Routers />
    </ApolloProvider>
  </React.StrictMode>
);
