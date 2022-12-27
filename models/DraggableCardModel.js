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

export default mongoose.models?.DraggableCard || mongoose.model('DraggableCard', DraggableCardSchema);