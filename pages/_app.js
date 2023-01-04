import '../styles/globals.css'
import Head from 'next/head';
import { KanbanProvider } from '../components/hooks/useKanban'
import { ApolloClient, InMemoryCache, ApolloProvider, split, HttpLink, ApolloLink, from } from '@apollo/client';
import mongoose from 'mongoose'
import dbConnect from '../lib/dbConnect';

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
    <div>
      <Head>
        <meta charset="UTF-8" />
        <meta name="keywords" content="titla, meta, nextjs" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ApolloProvider client={client} >
        <KanbanProvider>
          {getLayout(<Component {...pageProps} />)}
        </KanbanProvider>
      </ApolloProvider>
    </div>
  )
}

// App.getInitialProps = async (ctx) => {
//   await dbConnect();
//   return {}
// }

