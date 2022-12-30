import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

export async function getClient() {
  const link = new HttpLink({
    uri: '/api/graphql',
    fetch: fetch
  });
  
  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
  return client;
}