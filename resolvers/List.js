const List  = {
  cards: async (parent) => {
    if (parent.DraggableCard.length === 0) {
      return;
    }
    const list = await parent.populate("DraggableCard");
    return list.DraggableCard;
  }
}
export default List;