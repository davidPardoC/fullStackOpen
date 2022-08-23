import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { setContext } from "@apollo/client/link/context";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { NotificationProvider } from "./context/NotificationContext";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("loggedInUser");
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    },
  };
});

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
