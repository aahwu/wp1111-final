import { Box, CircularProgress } from '@mui/material'

const Loading = props => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: props.fullHeight ? '100vh' : '100%'
    }}>
      <CircularProgress />
    </div>
  )
}

export default Loading