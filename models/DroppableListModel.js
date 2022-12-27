import mongoose from 'mongoose';
const Schema = mongoose.Schema

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
    type: Schema.Types.ObjectId,
    ref: 'DraggableCard'
  }],
  deleted: {
    type: Boolean,
    requires:
      [true, 'Deletion field is required.']
  },
});

export default mongoose.models?.DroppableList || mongoose.model('DroppableList', DroppableListSchema);