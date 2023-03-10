const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const Mutation = {

  /* User mutation */
  createUser: async (parent, { username, nickname, password }, { UserModel }) => {
    const userExist = await UserModel.findOne({ name: username });
    if (userExist) {
      return { user: userExist, payload: 'FAIL' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new UserModel({ name: username, nickname: nickname, password: hashedPassword}).save();

    return { user: newUser, payload: 'SUCCESS'};
  },

  login: async (parent, { username, password }, { UserModel }) => {
    const userExist = await UserModel.findOne({ name: username });
    if (!userExist) {
      return { payload: "FAIL", errorMsg: "User don\'t exist."}
    }
    const passwordValid = await bcrypt.compare(password, userExist.password);
    if (!passwordValid) {
      return { payload: "FAIL", errorMsg: "Wrong password."}
    }
    const newToken = jwt.sign({ id: userExist._id, name: userExist.name }, 'inari', {expiresIn: '10d'});
    await userExist.populate("Kanban");
    return { 
      user: userExist, 
      payload: 'SUCCESS', 
      token: newToken,
      kanbans: userExist.Kanban,
    }
  },

  /* Kanban mutation */
  createKanban: async (parent, args, { KanbanModel, UserModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const user = await UserModel.findById(me.id);
    const newKanban = await new KanbanModel({ parentId: me.id }).save();
    user.Kanban.push(newKanban);

    await user.save();

    return newKanban;
  },
  deleteKanban: async (parent, { kanbanId }, { UserModel, KanbanModel, DroppableListModel, DraggableCardModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const kanban = await KanbanModel.findByIdAndRemove(kanbanId);

    if (!kanban) {
      throw new Error('Kanban not exist');
    }
    const user = await UserModel.findByIdAndUpdate(kanban.parentId, { $pull: { 'Kanban': kanbanId } });
    for (const listId of kanban.DroppableList) {
      const list = await DroppableListModel.findByIdAndRemove(listId);
      for (const cardId of list.DraggableCard) {
        const card = await DraggableCardModel.findByIdAndRemove(cardId);
      }
    }
    return kanban;
  },
  updateKanbanName: async (parent, { kanbanId, data }, { KanbanModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const kanban = await KanbanModel.findByIdAndUpdate(kanbanId, data, { new: true });

    if (!kanban) {
      throw new Error('Kanban not exist');
    }

    return kanban;
  },
  updateKanbanDescription: async (parent, { kanbanId, data }, { KanbanModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const kanban = await KanbanModel.findByIdAndUpdate(kanbanId, data, { new: true });

    if (!kanban) {
      throw new Error('Kanban not exist');
    }

    return kanban;
  },
  updateKanbanFavorite: async (parent, { kanbanId, data }, { KanbanModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const kanban = await KanbanModel.findByIdAndUpdate(kanbanId, data, { new: true });
    if (!kanban) {
      throw new Error('Kanban not exist');
    }

    return kanban;
  },

  /* List mutation */
  createList: async (parent, { kanbanId }, { KanbanModel, DroppableListModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const kanban = await KanbanModel.findById(kanbanId);

    if (!kanban) {
      throw new Error('Kanban not exist');
    }

    const newList = await new DroppableListModel({ parentId: kanbanId }).save();
    kanban.DroppableList.push(newList);
    await kanban.save();

    // pubsub.publish(`kanban ${data.kanbanId}`, {
    //   list: newList,
    // });

    return newList;
  },
  deleteList: async (parent, { listId }, { KanbanModel, DroppableListModel, DraggableCardModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const list = await DroppableListModel.findByIdAndRemove(listId);

    if (!list) {
      throw new Error('List not exist');
    }
    const kanban = await KanbanModel.findByIdAndUpdate(list.parentId, { $pull: { 'DroppableList': listId } });
    for (const cardId of list.DraggableCard) {
      await DraggableCardModel.findByIdAndRemove(cardId);
    }

    return list;
  },
  updateList: async (parent, { listId, data }, { DroppableListModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const list = await DroppableListModel.findByIdAndUpdate(listId, data ,{ new: true });

    if (!list) {
      throw new Error('List not exist');
    }

    return list;
  },

  /* Card mutation */
  createCard: async (parent, { listId }, { DroppableListModel, DraggableCardModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const list = await DroppableListModel.findById(listId);

    if (!list) {
      throw new Error('List not exist');
    }
    const cardsCount = await DraggableCardModel.find({ parentId: listId }).count()
    const newCard = await new DraggableCardModel({ 
      parentId: listId,
      position: cardsCount > 0 ? cardsCount : 0,
    }).save();
    list.DraggableCard.push(newCard);
    await list.save();

    return newCard;
  },
  deleteCard: async (parent, { cardId }, { DroppableListModel, DraggableCardModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const card = await DraggableCardModel.findByIdAndRemove(cardId);

    if (!card) {
      throw new Error('Card not exist');
    }
    const list = await DroppableListModel.findByIdAndUpdate(card.parentId, { $pull: { 'DraggableCard': cardId } });

    return card;
  },
  updateCard: async (parent, { cardId, data }, { DraggableCardModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    const card = await DraggableCardModel.findByIdAndUpdate(cardId, data, { new: true });

    if (!card) {
      throw new Error('Card not exist');
    }

    return card;
  },
  updateCardPosition: async (parent, { data }, { DroppableListModel, DraggableCardModel, me }) => {
    if (!me) {
      throw new AuthenticationError("Please log in again.");
    }
    if (data.sourceListId) {
      const sourceList = await DroppableListModel.findByIdAndUpdate(data.sourceListId, { DraggableCard: data.sourceCardsId});
      const sourceKeys = data.sourseCardsId;
      for (const key in sourceKeys) {
        await DraggableCardModel.findByIdAndUpdate(
          data.sourseCardsId[key], 
          { position: key, parentId: data.sourceListId }  
        )
      }
    }
    const destinationList = await DroppableListModel.findByIdAndUpdate(data.destinationListId, { DraggableCard: data.destinationCardsId});
    const destinationKeys = data.destinationCardsId;
    for (const key in destinationKeys) {
      await DraggableCardModel.findByIdAndUpdate(
        data.destinationCardsId[key], 
        { position: key, parentId: data.destinationListId }  
      )
    }
    return ;
  }
  // createMessage: async (parent, { name, to, body }, { pubsub, ChatBoxModel } ) => {
  //   const createChatBoxName = (name, to) => {
  //     return [name, to].sort().join('_');
  //   };
  //   const validateChatBox = async (name1, name2) => {
  //     const chatBoxName = createChatBoxName(name1, name2);
  //     let box = await ChatBoxModel.findOne({ name: chatBoxName });
  //     if (!box) {
  //       box = await new ChatBoxModel({ name: chatBoxName }).save();
  //     }
  //     return box;
  //   };
  //   const chatBox = await validateChatBox(name, to);
  //   const newMsg = { sender: name, body };
  //   chatBox.messages.push(newMsg);
  //   await chatBox.save();
    
  //   const chatBoxName = createChatBoxName(name, to);
  //   pubsub.publish(`chatbox ${chatBoxName}`, {
  //     message: newMsg,
  //   });
  //   return newMsg;
  // },
};

export default Mutation;