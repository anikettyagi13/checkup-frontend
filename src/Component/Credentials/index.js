import { Button, Divider } from '@material-ui/core'
import { Grid, SliderValueLabel, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import theme from '../../Theme'
import './login.css'
import React, { useEffect, createRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { apiRequest, uuidv4 } from '../../utils/utils'
import LoginMain from './LoginMain'
import img from '../../assets/doctors.svg'
import SignUpMain from './SignUpMain'
import { signingPolicy } from '@azure/core-http'
import { animateImage, animateBlock } from './Animations'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Login({ user, setUser, type }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [value, changes] = useState({})
  const [open, setOpen] = useState(false)
  const [accountType, setAccountType] = useState(false)
  const homeRef = createRef()
  useEffect(() => {
    animateImage()
    animateBlock()
  }, [])
  useEffect(() => {
    setName('')
    setPassword('')
    setEmail('')
    animateBlock()
  }, [type])
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
        setUser(value.data)
        homeRef.current.click()
      }
    }
  }, [value])
  function handleClose() {
    setOpen(false)
  }

  async function LoginClick() {
    if (email.length === 0 || password.length === 0) {
      setOpen(true)
      setError('Please Fill in the details!')
    } else {
      const obj = { email, password }
      await apiRequest('post', '/login', changes, obj)
    }
  }
  async function SignUpClick() {
    if (email.length === 0 || password.length === 0 || name.length === 0) {
      setOpen(true)
      setError('Please Fill in the details!')
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
      <Grid item xs={0} sm={6} className="hidden600 hidden animateImage">
        <img
          src={img}
          alt="doctors"
          style={{ width: '100%', marginLeft: '20px' }}
        />
      </Grid>
      <Grid
        container
        justifyContent="center"
        alignContent="center"
        item
        xs={12}
        sm={6}
      >
        {type === 'login' ? (
          <LoginMain
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            LoginClick={LoginClick}
          />
        ) : (
          <SignUpMain
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            accountType={accountType}
            setAccountType={setAccountType}
            SignUpClick={SignUpClick}
          />
        )}
      </Grid>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          style={{ backgroundColor: theme.palette.red.main }}
        >
          {error}
        </Alert>
      </Snackbar>
      <Link to="/" style={{ display: 'none' }} ref={homeRef} />
    </Grid>
  )
}
