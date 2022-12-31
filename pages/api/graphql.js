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

const typeDefs = gql`
  type Query {
    kanbans: [Kanban!]
    lists(query: String!): [List!]
    getListsById(query: ID!): [List!]
    # cards(query: String!): Kanban!
  }

  type Mutation {
    createKanban(data: CreateKanbanInput!): Kanban!
    deleteKanban(id: String!): Kanban!
    updateKanban(id: String!, data: UpdateKanbanInput): Kanban!

    createList(kanbanId: ID!): List!
    deleteList(listId: ID!): List!
    updateList(listId: ID!, data: UpdateListInput!): List!

    createCard(listId: ID!): Card!
    deleteCard(cardId: ID!): Card!
    updateCard(cardId: ID!, data: UpdateCardInput!): Card!
    updateCardPosition(data: UpdateCardPositionInput!): String
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
    _id: ID
    parentId: String
    name: String
    body: String
    position: Int
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
    name: String
  }

  input CreateCardInput {
    # body: String!
    listId: String!
  }

  input UpdateCardInput {
    name: String
    body: String
  }

  input UpdateCardPositionInput {
    sourceListId: ID
    destinationListId: ID!
    sourceCardsId: [ID]
    destinationCardsId: [ID!]!
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
// const { serverRuntimeConfig } = getConfig();
// console.log(serverRuntimeConfig)
// const schemaPath = resolve(serverRuntimeConfig.PROJECT_ROOT, 'out/public/schema.graphql');
// const typeDefs = readFileSync(schemaPath, 'utf8');
// dbConnect();
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
  await dbConnect();
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