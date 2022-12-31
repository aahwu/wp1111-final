import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* DraggableCard Schema *******/
const DraggableCardSchema = new Schema({
  parentId: {
    type: String,
    required: [true, 'ParentId field is required.']
  },
  name: {
    type: String,
    default: '',
  },
  body: {
    type: String, 
    default: '',
  },
  position: {
    type: Number
  }
});

export default mongoose.models?.DraggableCard || mongoose.model('DraggableCard', DraggableCardSchema);