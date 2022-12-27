import dbConnect from "../../../lib/dbConnect";
import KanbanModel from "../../../models/KanbanModel";
import DroppableListModel from "../../../models/DroppableListModel";
import DraggableCardModel from "../../../models/DraggableCardModel";


export default async function handler(req, res) {
  switch (req.method) {
    case 'GET': {
      // res.status(200).json({ name: 'John Doe' })
      return getAllKanban(req, res);
    }
  }
}

const getAllKanban = async (req, res) => {

  // await dbConnect();

  // res.status(200).json({ name: 'John Doe' })

  try {
    const result = await KanbanModel.find({});
    console.log(result[0].DroppableList[0].toString())
    let dev = process.env.NODE_ENV !== 'production';
    let { DEV_URL, PROD_URL } = process.env;
    let listObject = await fetch(`${dev ? DEV_URL : PROD_URL}/api/list/${result[0].DroppableList[0].toString()}`, {
      method: 'GET',
    })
    let data = await listObject.json();
    // result.DroppableList.forEach(listId => {
    //   let listObject = fetch(`/api/list/${listId}`)
      
    // });

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