const Mutation = {

  /* Kanban mutation */
  createKanban: async (parent, { data }, { KanbanModel }) => {
    const kanbanTaken = await KanbanModel.findOne({ name: data.name });

    if (kanbanTaken) {
      throw new Error('Kanban taken');
    }

    const newKanban = await new KanbanModel({ name: data.name, lists: [] }).save();

    return newKanban;
  },
  deleteKanban: async (parent, { id }, { KanbanModel }) => {
    const kanban = await KanbanModel.findByIdAndRemove(id);

    if (!kanban) {
      throw new Error('Kanban not exist');
    }

    return kanban;
  },
  updateKanban: async (parent, { id, data }, { KanbanModel }) => {
    const kanban = await KanbanModel.findByIdAndUpdate(id, data);

    if (!kanban) {
      throw new Error('Kanban not exist');
    }

    return kanban;
  },

  /* List mutation */
  createList: async (parent, { data }, { pubsub, KanbanModel, DroppableListModel }) => {
    const kanban = await KanbanModel.findById(data.kanbanId);

    if (!kanban) {
      throw new Error('Kanban not exist');
    }

    const newList = await new DroppableListModel({ name: data.name, parentId: data.kanbanId }).save();
    kanban.DroppableList.push(newList);
    await kanban.save();

    pubsub.publish(`kanban ${data.kanbanId}`, {
      list: newList,
    });

    return newList;
  },
  deleteList: async (parent, { id }, { KanbanModel, DroppableListModel }) => {
    const list = await DroppableListModel.findByIdAndRemove(id);

    if (!list) {
      throw new Error('List not exist');
    }
    const kanban = await KanbanModel.findByIdAndUpdate(list.parentId, { $pull: { 'DroppableList': id } });

    return list;
  },
  updateList: async (parent, { id, data }, { DroppableListModel }) => {
    const list = await DroppableListModel.findByIdAndUpdate(id, data);

    if (!list) {
      throw new Error('List not exist');
    }

    return list;
  },

  /* Card mutation */
  createCard: async (parent, { listId }, { DroppableListModel, DraggableCardModel }) => {
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
  deleteCard: async (parent, { cardId }, { DroppableListModel, DraggableCardModel }) => {
    const card = await DraggableCardModel.findByIdAndRemove(cardId);

    if (!card) {
      throw new Error('Card not exist');
    }
    const list = await DroppableListModel.findByIdAndUpdate(card.parentId, { $pull: { 'DraggableCard': cardId } });

    return card;
  },
  updateCard: async (parent, { cardId, data }, { DraggableCardModel }) => {
    const card = await DraggableCardModel.findByIdAndUpdate(cardId, data, { new: true });

    if (!card) {
      throw new Error('Card not exist');
    }

    return card;
  },
  updateCardPosition: async (parent, { data }, { DroppableListModel, DraggableCardModel }) => {
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