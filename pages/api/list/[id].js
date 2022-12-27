import dbConnect from "../../../lib/dbConnect";
import KanbanModel from "../../../models/KanbanModel";
import DroppableListModel from "../../../models/DroppableListModel";
import DraggableCardModel from "../../../models/DraggableCardModel";


export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      // res.status(200).json({ name: 'John Doe' })
      return getList(req, res);
    }
  }
}

const getList = async (req, res) => {

  // await dbConnect();

  const { listId } = req.query;
  console.log("list call")

  try {
    const result = await KanbanModel.find({});
    const kanbans = result.map((kanbanObject) => {

    })
    return res.json({
      payload: JSON.parse(JSON.stringify(result)),
      success: true,
    });
  } catch (error) {
    console.log(error)
    return res.json({
      payload: new Error(error).message,
      success: false,
    });
  }
}