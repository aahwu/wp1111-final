import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* DraggableCard Schema *******/
const DraggableCardSchema = new Schema({
  parentId: {
    type: String, 
    required: 
      [true, 'ParentId field is required.']
  },
  body: {
    type: String, 
    required: 
      [true, 'Body field is required.']
  },
  deleted: {
    type: Boolean,
    requires:
      [true, 'Deletion field is required.']
  },
});
const DraggableCardModel = mongoose.models.DraggableCard || mongoose.model('DraggableCard', DraggableCardSchema);

/******* DroppableList Schema *******/
const DroppableListSchema = new Schema({
  name: {
    type: String, 
    required: 
      [true, 'Name field is required.']
  },
  parentId: {
    type: String, 
    required: 
      [true, 'ParentId field is required.']
  },
  DraggableCard: [{
    type: mongoose.Types.ObjectId,
    // ref: 'DraggableCard'
  }],
  deleted: {
    type: Boolean,
    requires:
      [true, 'Deletion field is required.']
  },
});
const DroppableListModel = mongoose.models.DroppableList || mongoose.model('DroppableList', DroppableListSchema);

/******* Kanban Schema *******/
const KanbanSchema = new Schema({
  name: {
    type: String, 
    required: 
      [true, 'Name field is required.']
  },
  DroppableList: [{
    type: mongoose.Types.ObjectId,
    // ref: 'DroppableList'
  }],
  deleted: {
    type: Boolean,
    requires:
      [true, 'Deletion field is required.']
  },
});
const KanbanModel = mongoose.models.Kanban || mongoose.model('Kanban', KanbanSchema);

export default mongoose.models.Kanban || mongoose.model('Kanban', KanbanSchema);