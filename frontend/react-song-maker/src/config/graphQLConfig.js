import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI;

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GRAPHQL_URI,
  }),
});
