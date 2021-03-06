import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from "react-router-dom";
import App from './App';
import * as serviceWorker from './serviceWorker';


// Apollo is our graphql client
// A Graphql client is in charge of passing request
// between client and server
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

// Apollo client setup
const client = new ApolloClient({
  uri:process.env.REACT_APP_GRAPHQL_URL
})

// Apollo provider allow us to get the data from the data client endpooint
// and inject into whatever is inside Apollo provider
ReactDOM.render(
    <ApolloProvider client={client}>
          <Router><App /></Router>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
