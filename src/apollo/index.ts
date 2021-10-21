import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import config from "@/config";

const link = createHttpLink({
  // You should use an absolute URL here
  uri: `${config.VUE_APP_API_ENDPOINT}/graphql`,
  credentials: "include",
});

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});
