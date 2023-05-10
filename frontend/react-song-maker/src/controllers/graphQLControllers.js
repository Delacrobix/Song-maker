import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { testQuery } from "./queries";

const GRAPHQL_URI = process.env.REACT_APP_GRAPHQL_URI;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: GRAPHQL_URI,
  }),
});

export function getTest() {
  client.query({ query: testQuery }).then((res) => {
    console.log(res.data);
  });
}
