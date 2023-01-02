import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* Kanban Schema *******/
const KanbanSchema = new Schema({
  name: {
    type: String, 
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  parentId: {
    type: String, 
    required: 
      [true, 'ParentId field is required.']
  },
  DroppableList: [{
    type: Schema.Types.ObjectId,
    ref: 'DroppableList'
  }],
  favourite: {
    type: Boolean,
    default: false
  },
});
// const KanbanModel = mongoose.models.Kanban || mongoose.model('Kanban', KanbanSchema);

export default mongoose.models?.Kanban || mongoose.model('Kanban', KanbanSchema);