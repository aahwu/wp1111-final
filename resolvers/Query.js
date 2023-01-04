const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');


const Query = {
  
  initialization: async (parent, args, { UserModel }) => {
    const user = await UserModel.findOne({});
    return true;
  },

  kanbans: async (parent, { username }, { KanbanModel, UserModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const user = await UserModel.findById(me.id)
    await user.populate("Kanban");
    return user.Kanban;
  },
  lists: async (parent, { query }, { KanbanModel }) => {
    const kanban = await KanbanModel.findOne({ name: query });
    if (!kanban) {
      throw new Error('Kanban not exist');
    }
    if (kanban.DroppableList.length === 0) {
      return;
    }
    
    await kanban.populate("DroppableList");
    return kanban.DroppableList;
  },
  getListsById: async (parent, { query }, { KanbanModel }) => {
    const kanban = await KanbanModel.findById({ _id: query });
    if (!kanban) {
      throw new Error('Kanban not exist');
    }
    if (kanban.DroppableList.length === 0) {
      return;
    }
    
    await kanban.populate("DroppableList");
    return kanban.DroppableList;
  },
};

export default Query;
