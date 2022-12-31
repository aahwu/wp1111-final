import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* Kanban Schema *******/
const KanbanSchema = new Schema({
  name: {
    type: String, 
    default: '',
  },
  DroppableList: [{
    type: Schema.Types.ObjectId,
    ref: 'DroppableList'
  }],
  position: {
    type: Number
  }
});
// const KanbanModel = mongoose.models.Kanban || mongoose.model('Kanban', KanbanSchema);

export default mongoose.models?.Kanban || mongoose.model('Kanban', KanbanSchema);