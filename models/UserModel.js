import mongoose from 'mongoose';
const Schema = mongoose.Schema

/******* Kanban Schema *******/
const UserSchema = new Schema({
  name: {
    type: String, 
    required: 
      [true, 'Name field is required.']
  },
  nickname: {
    type: String,
    default: '',
  },
  password: {
    type: String, 
    required: 
      [true, 'Password field is required.']
  },
  Kanban: [{
    type: Schema.Types.ObjectId,
    ref: 'Kanban'
  }],
});
// const KanbanModel = mongoose.models.Kanban || mongoose.model('Kanban', KanbanSchema);

export default mongoose.models?.User || mongoose.model('User', UserSchema);