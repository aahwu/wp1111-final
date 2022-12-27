import '../styles/globals.css'
import { KanbanProvider } from '../containers/hooks/useKanban'
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink } from '@apollo/client';
// import { HttpLink } from 'apollo-link-http';

// let dev = process.env.NODE_ENV !== 'production';
// let { DEV_URL, PROD_URL } = process.env;

// const httpLink = new HttpLink({
//   uri: `${dev ? DEV_URL : PROD_URL}/api/graphql`
// });

const link = new HttpLink({
  uri: '/api/graphql',
  fetch: fetch
});

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client} >
      <KanbanProvider>
        <Component {...pageProps} />
      </KanbanProvider>
    </ApolloProvider>
  )
}
