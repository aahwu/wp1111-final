import '../styles/globals.css'
import { KanbanProvider } from '../containers/hooks/useKanban'
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
import { getClient } from '../lib/getClient';

const link = new HttpLink({
  uri: '/api/graphql',
  fetch: fetch
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ApolloProvider client={client} >
      <KanbanProvider>
        {getLayout(<Component {...pageProps} />)}
      </KanbanProvider>
    </ApolloProvider>
  )
}
