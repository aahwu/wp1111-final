const DeleteButton = ({ cardInd, listInd, handleDelete }) => {
  return (
    <button
      type="button"
      onClick={handleDelete(listInd, cardInd)}
    >
      delete
    </button>
  )
}

export default DeleteButton;