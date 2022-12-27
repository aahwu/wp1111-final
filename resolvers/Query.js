const Query = {
  kanbans: async (parent, { query }, { KanbanModel }) => {
    if (!query) {
      return KanbanModel.find({});
    }
    const kanban = await KanbanModel.find({ name: { $regex: query } });
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
};

export default Query;
