const Kanban  = {
  lists: async (parent) => {
    if (parent.DroppableList.length === 0) {
      return;
    }
    const kanban = await parent.populate("DroppableList");
    return kanban.DroppableList;
  }
}
export default Kanban;