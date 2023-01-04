import { gql, ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import UserModel from "../../models/UserModel"
import KanbanModel from "../../models/KanbanModel";
import DroppableListModel from "../../models/DroppableListModel";
import DraggableCardModel from "../../models/DraggableCardModel";
import Query from '../../resolvers/Query';
import Mutation from '../../resolvers/Mutation';
import Subscription from '../../resolvers/Subscription';
import Kanban from '../../resolvers/Kanban'
import List from '../../resolvers/List'
import dbConnect from "../../lib/dbConnect";

const jwt = require('jsonwebtoken')

const typeDefs = gql`
  type Query {
    kanbans(username: String): [Kanban!]
    lists(query: String!): [List!]
    getListsById(query: ID!): [List!]
    # cards(query: String!): Kanban!
  }

  type Mutation {
    createUser(username: String!, nickname: String, password: String!): RegisterPayload!
    login(username: String!, password: String!): LoginPayload!

    createKanban: Kanban!
    deleteKanban(kanbanId: ID!): Kanban!
    updateKanbanName(kanbanId: ID!, data: UpdateKanbanNameInput!): Kanban!
    updateKanbanDescription(kanbanId: ID!, data: UpdateKanbanDescriptionInput!): Kanban!
    updateKanbanFavorite(kanbanId: ID!, data: UpdateKanbanFavoriteInput!): Kanban!

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

  # Type
  type RegisterPayload {
    user: User!
    payload: PayloadType!
  }
  type LoginPayload {
    user: User
    token: String
    payload: PayloadType!
    errorMsg: String
    kanbans: [Kanban]
  }
  type User {
    _id: ID!
    name: String
    nickname: String
  }
  type Kanban {
    _id: ID
    name: String
    description: String
    favorite: Boolean
    lists: [List!]
  }
  type List {
    _id: ID
    parentId: String
    name: String
    cards: [Card!]
  }
  type Card {
    _id: ID
    parentId: String
    name: String
    body: String
    position: Int
  }

  # Input
  input UpdateKanbanNameInput {
    name: String!
  }
  input UpdateKanbanDescriptionInput {
    description: String!
  }
  input UpdateKanbanFavoriteInput {
    favorite: Boolean!
  }
  input UpdateListInput {
    name: String
  }
  input CreateCardInput {
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

  enum PayloadType {
    SUCCESS
    FAIL
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
  context: async ({ req }) => {
    const token = req.headers.authorization;
    const SECRET = "inari";//process.env.SECRET;
    const context = { KanbanModel, DroppableListModel, DraggableCardModel, UserModel, SECRET };
    if (token) {
      try {
        const me = await jwt.verify(token.replace('Bearer ', ''), SECRET);
        return { ...context, me };
      } catch (e) {
        throw new Error('Your session expired. Sign in again.');
      }
    }
    return context;
  },
  introspection: true,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default cors(async(req, res) => {
  // await dbConnect(process.env.MONGODB_URI);
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