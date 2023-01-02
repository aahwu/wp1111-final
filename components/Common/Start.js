import { LoadingButton } from '@mui/lab';
import { useEffect, useState } from "react"
import { useKanban } from '../hooks/useKanban';

const Start = ({ noKanban }) => {

  const [loading, setLoading] = useState(false)
  const { kanbans, createKanban, username, login, queryKanbans } = useKanban();

  // handle onclick of menu
  const handleOnClick = async () => {
    setLoading(true);
    await createKanban();
    setLoading(false);
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <LoadingButton
        variant='outlined'
        color='success'
        onClick={handleOnClick}
        loading={loading}
        style={{
          marginBottom: '10px'
        }}
      >
        Create kanban
      </LoadingButton>
      {!kanbans ? <></> : 
        <div
          style={{
            // height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: 'black',
          }}
        >
          <p
            style={{
              marginBottom: '10px'
            }}
          >
            or
          </p>
          <p>
            Select your kanban
          </p>
        </div>
      }
    </div>
  )
}

export default Start;