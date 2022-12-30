import { LoadingButton } from '@mui/lab';
import { useState } from "react"

const Start = () => {

  const [loading, setLoading] = useState(false)

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LoadingButton
        variant='outlined'
        color='success'
        // onClick={createBoard}
        loading={loading}
      >
        Click here to create your first board
      </LoadingButton>
    </div>
  )
}

export default Start;