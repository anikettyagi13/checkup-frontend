import { Button, Divider } from '@material-ui/core'
import { Grid, SliderValueLabel, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import theme from '../../Theme'
import './login.css'
import React, { useEffect, createRef } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { apiRequest, uuidv4, validateEmail } from '../../utils/utils'
import LoginMain from './LoginMain'
import img from '../../assets/doctors.svg'
import SignUpMain from './SignUpMain'
import { signingPolicy } from '@azure/core-http'
import { animateImage, animateBlock } from './Animations'
import { useLocation } from 'react-router-dom'
import Loading from '../../utils/Loading'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Login({ user, setUser, type }) {
  const search = useLocation().search
  const path = new URLSearchParams(search).get('path')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [value, changes] = useState({})
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [accountType, setAccountType] = useState(false)
  const [buttonClick, setButtonClick] = useState(false)
  const homeRef = createRef()
  useEffect(() => {
    animateImage()
    animateBlock()
  }, [])
  useEffect(() => {
    if (user && user.type) {
      homeRef.current.click()
    }
  }, [user])
  useEffect(() => {
    setName('')
    setPassword('')
    setEmail('')
    animateBlock()
  }, [type])
  useEffect(() => {
    setButtonClick(false)
    setLoading(false)
    if (value.data) {
      if (value.data.error) {
        setError(value.data.error)
        setOpen(true)
      } else {
        if (value.data.id) {
          localStorage.setItem(
            'session_id',
            value.data.id + '!id@' + value.data.token,
          )
          setUser(value.data)
        } else {
          setUser(value.data)
        }
        homeRef.current.click()
      }
    }
  }, [value])
  function handleClose() {
    setOpen(false)
  }

  async function LoginClick() {
    setButtonClick(true)
    if (email.length === 0 || password.length === 0 || !validateEmail(email)) {
      setOpen(true)
      setError('Please fill in correct details!')
      setButtonClick(false)
    } else {
      const obj = { email, password }
      await apiRequest('post', '/login', changes, obj)
    }
  }
  async function SignUpClick() {
    setButtonClick(true)
    if (
      email.length === 0 ||
      password.length === 0 ||
      name.length === 0 ||
      !validateEmail(email)
    ) {
      setOpen(true)
      setError('Please fill in correct  details!')
      setButtonClick(false)
    } else {
      const id = uuidv4()
      const type = accountType === true ? 'doctor' : 'patient'
      const obj = { name, email, type, password, id }
      await apiRequest('post', '/signup', changes, obj)
    }
  }
  return (
    <>
      {loading ? (
        <Grid
          style={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#1F4F6B',
          }}
        >
          <Loading width="300" />
        </Grid>
      ) : (
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
                path={path}
                buttonClick={buttonClick}
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
                path={path}
                buttonClick={buttonClick}
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
          <Link
            to={path !== 'null' ? path : '/'}
            style={{ display: 'none' }}
            ref={homeRef}
          />
        </Grid>
      )}
    </>
  )
}
