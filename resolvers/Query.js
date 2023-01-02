const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = ({ id, name }) => {
  jwt.sign(
    { id, name },
    process.env.SECRET, 
    {expiresIn: '1d'}
  )
};


const Query = {
  login: async (parent, { username, password }, { UserModel }) => {
    const userExist = await UserModel.findOne({ name: username });
    if (!userExist) {
      console.log("fail")
      return { payload: "FAIL", errorMsg: "User don\'t exist."}
    }
    const passwordValid = await bcrypt.compare(password, userExist.password);
    if (!passwordValid) {
      console.log("fail")
      return { payload: "FAIL", errorMsg: "Wrong password."}
    }
    console.log("success")
    const newToken = await createToken({ id: userExist._id, name: userExist.name });
    console.log(newToken)
    return { 
      user: userExist, 
      payload: 'SUCCESS', 
      token: newToken
    }
  },

  kanbans: async (parent, args, { KanbanModel }) => {
    // if (!query) {
    //   return KanbanModel.find({});
    // }
    const kanban = await KanbanModel.find({});
    return kanban;
  },
  lists: async (parent, { query }, { KanbanModel }) => {
    const kanban = await KanbanModel.findOne({ name: query });
    if (!kanban) {
      throw new Error('Kanban not exist');
    }
    if (kanban.DroppableList.length === 0) {
      return;
    }
    
    await kanban.populate("DroppableList");
    return kanban.DroppableList;
  },
  getListsById: async (parent, { query }, { KanbanModel }) => {
    const kanban = await KanbanModel.findById({ _id: query });
    if (!kanban) {
      throw new Error('Kanban not exist');
    }
    if (kanban.DroppableList.length === 0) {
      return;
    }
    
    await kanban.populate("DroppableList");
    return kanban.DroppableList;
  },
};

export default Query;
