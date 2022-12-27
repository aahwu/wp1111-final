import { gql, ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import KanbanModel from "../../models/KanbanModel";
import DroppableListModel from "../../models/DroppableListModel";
import DraggableCardModel from "../../models/DraggableCardModel";
import Query from '../../resolvers/Query';
import Mutation from '../../resolvers/Mutation';
import Subscription from '../../resolvers/Subscription';
import Kanban from '../../resolvers/Kanban'
import List from '../../resolvers/List'
import dbConnect from "../../lib/dbConnect";
import { resolve } from 'path';
import { readFileSync } from 'fs';
import getConfig from 'next/config';

let books = [
    {
        "id": 0,
        "name": "JavaScript for Dummies"
    }
  // ... Write a few more ...
]

const typeDefs = gql`
  type Query {
    kanbans(query: String): [Kanban!]
    lists(query: String!): [List!]
    # cards(query: String!): Kanban!
  }
  
  type Mutation {
    createKanban(data: CreateKanbanInput!): Kanban!
    deleteKanban(id: String!): Kanban!
    updateKanban(id: String!, data: UpdateKanbanInput): Kanban!
    createList(data: CreateListInput!): List!
    deleteList(id: ID!): List!
    updateList(id: ID!, data: UpdateListInput): List!
    createCard(data: CreateCardInput!): Card!
    deleteCard(id: ID!): Card!
    updateCard(id: ID!, data: UpdateCardInput): Card!
  }
  
  # type Subscription {
  #   card(listId: ID!): CardSubscriptionPayload!
  #   list(kanbanId: ID!): ListSubscriptionPayload!
  # }
  
  type Kanban {
    _id: ID!
    name: String!
    lists: [List!]
  }
  
  type List {
    _id: ID!
    parentId: String!
    name: String!
    cards: [Card!]
  }
  
  type Card {
    _id: ID!
    parentId: String!
    body: String!
  }
  
  input CreateKanbanInput {
    name: String!
  }
  
  input UpdateKanbanInput {
    name: String!
  }
  
  input CreateListInput {
    name: String!
    kanbanId: String!
  }
  
  input UpdateListInput {
    parentId: String
    name: String
  }
  
  input CreateCardInput {
    body: String!
    listId: String!
  }
  
  input UpdateCardInput {
    parentId: String
    body: String
  }
  
  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }
  
  type CardSubscriptionPayload {
    mutation: MutationType!
    data: Card!
  }
  
  type ListSubscriptionPayload {
    mutation: MutationType!
    data: List!
  }
`;

// const resolvers = {
//   Query: {
//       getBooks: () => {
//           return books
//       }
//   },
// };
const { serverRuntimeConfig } = getConfig();
console.log(serverRuntimeConfig)
const schemaPath = resolve(serverRuntimeConfig.PROJECT_ROOT, 'out/public/schema.graphql');
// const typeDefs = readFileSync(schemaPath, 'utf8');
dbConnect();
const cors = Cors();
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    // Subscription,
    Kanban,
    List,
  },
  context: {
    KanbanModel,
    DroppableListModel,
    DraggableCardModel,
  },
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default cors(async(req, res) => {
  await startServer;
  await apolloServer.createHandler({
      path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
      bodyParser: false,
  },
};