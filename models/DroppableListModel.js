import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* DroppableList Schema *******/
const DroppableListSchema = new Schema({
  name: {
    type: String, 
    default: '',
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
});

export default mongoose.models?.DroppableList || mongoose.model('DroppableList', DroppableListSchema);