const Query = {
  kanbans: async (parent, args, { KanbanModel }) => {
    // if (!query) {
    //   return KanbanModel.find({});
    // }
    const kanban = await KanbanModel.find({});
    return kanban;
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
