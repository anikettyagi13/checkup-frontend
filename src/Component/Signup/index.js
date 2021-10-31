import { Button } from '@material-ui/core'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import React, { createRef, useEffect, useState } from 'react'
import theme from '../../Theme'
import './signup.css'
import { apiRequest, uuidv4 } from '../../utils/utils'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Signup({ user, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [accountType, setAccountType] = useState(false)
  const [error, setError] = useState('')
  const [value, changes] = useState({})
  const [open, setOpen] = useState(false)
  const homeRef = createRef()

  useEffect(() => {
    if (value.data) {
      if (value.data.error) {
        setError(value.data.error)
        setOpen(true)
      } else {
        localStorage.setItem(
          'session_id',
          value.data.id + '!id@' + value.data.token,
        )
        setUser({ name: value.data.name, email: value.data.email })
        homeRef.current.click()
      }
    }
  }, [value])

  function handleClose() {
    setOpen(false)
  }
  async function SignUpClick() {
    if (email.length === 0 || password.length === 0 || name.length === 0) {
      //TODO SIGNUP EMPTY
    } else {
      const id = uuidv4()
      const type = accountType === true ? 'doctor' : 'patient'
      const obj = { name, email, type, password, id }
      await apiRequest('post', '/signup', changes, obj)
    }
  }

  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      alignContent="center"
      style={{ height: '100vh' }}
    >
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        lg={4}
        className="login"
      >
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            {error}
          </Alert>
        </Snackbar>
      </Grid>

      <Link to="/" style={{ display: 'none' }} ref={homeRef} />
    </Grid>
  )
}
