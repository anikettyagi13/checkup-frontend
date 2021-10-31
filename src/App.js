import Navigation from './Navigation'
import { useState, useEffect, createRef } from 'react'
import { apiRequest } from './utils/utils'
import { socket } from './utils/socket'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'

import theme from './Theme'
import { Button } from '@material-ui/core'
import { BrowserRouter, Link } from 'react-router-dom'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

require('dotenv').config({ path: '../.env' })

let u = {}

function App() {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState({ action: {} })
  const [value, changes] = useState({})
  const [user, setUser] = useState({})
  const AppointmentRef = createRef()
  useEffect(() => {
    if (user.type) {
      u = user
      socket.emit('new_id', user)
      socket.on('notification', (data) => {
        setMessage(data)
        setOpen(true)
      })
    } else {
      if (u.type) {
        socket.emit('user_removed', u)
        u = {}
      }
    }
  }, [user])

  useEffect(() => {
    if (value.data) setUser(value.data)
  }, [value])
  useEffect(() => {
    async function apis() {
      await apiRequest('post', '/api', changes, {
        session_id: localStorage.getItem('session_id'),
      })
    }
    apis()
  }, [])
  function handleClose() {
    setOpen(false)
  }
  function appointmentClick() {
    if (AppointmentRef) {
      AppointmentRef.current.click()
    }
  }
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          {message.info ? (
            <Alert
              onClose={handleClose}
              severity="info"
              sx={{ width: '100%' }}
              action={
                message.action ? (
                  <Button
                    color="inherit"
                    size="small"
                    onClick={appointmentClick}
                  >
                    {message.action.title}
                  </Button>
                ) : null
              }
            >
              {message.message}
            </Alert>
          ) : (
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: '100%' }}
              action={
                message.action ? (
                  <Button
                    color="inherit"
                    size="small"
                    onClick={appointmentClick}
                  >
                    {message.action.title}
                  </Button>
                ) : null
              }
            >
              {message.message}
            </Alert>
          )}
        </Snackbar>
        <Navigation
          user={user}
          setUser={setUser}
          socket={socket}
          AppointmentRef={AppointmentRef}
          message={message}
        />
        {message.action ? (
          <Link ref={AppointmentRef} to={`${message.action.pathName}`} />
        ) : null}
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App