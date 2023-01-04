import { LoadingButton } from '@mui/lab';
import { useState } from "react"
import { useKanban } from '../hooks/useKanban';

const Start = () => {

  const [loading, setLoading] = useState(false)
  const { login, username, kanbans, createKanban } = useKanban();

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
      {!login ? 
        <div
          style={{
            fontSize: '40px',
            color: 'black',
            marginBottom: '40px'
          }}
        >
          Please log in again.
        </div>
      :
        <>
          <div
            style={{
              fontSize: '40px',
              color: 'black',
              marginBottom: '40px'
            }}
          >
            {`Welcome, ${username}`}
          </div>
          <LoadingButton
            variant='outlined'
            color='success'
            onClick={handleOnClick}
            loading={loading}
            style={{
              marginBottom: '10px'
            }}
          >
            Add kanban
          </LoadingButton>
          {(!kanbans || kanbans.length === 0) ? <></> : 
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
        </>
      }
    </div>
  )
}

export default Start;