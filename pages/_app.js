import '../styles/globals.css'
import { KanbanProvider } from '../containers/hooks/useKanban'
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink, ApolloLink, from } from '@apollo/client';
import { getClient } from '../lib/getClient';

const link = new HttpLink({
  uri: '/api/graphql',
  fetch: fetch
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const customHeaders = operation.getContext().hasOwnProperty("headers") ? operation.getContext().headers : {};
  operation.setContext({
    headers: {
      ...customHeaders
      //we can also set the authorization header
      // authorization: localStorage.getItem('jjjjjj'),
    }
  });
  return forward(operation);
});

const client = new ApolloClient({
  link: from([authMiddleware, link]),
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
