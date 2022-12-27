import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* Kanban Schema *******/
const KanbanSchema = new Schema({
  name: {
    type: String, 
    required: 
      [true, 'Name field is required.']
  },
  DroppableList: [{
    type: Schema.Types.ObjectId,
    ref: 'DroppableList'
  }],
  deleted: {
    type: Boolean,
    requires:
      [true, 'Deletion field is required.']
  },
});
// const KanbanModel = mongoose.models.Kanban || mongoose.model('Kanban', KanbanSchema);

export default mongoose.models?.Kanban || mongoose.model('Kanban', KanbanSchema);