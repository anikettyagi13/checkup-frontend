import React, { useEffect } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import theme from '../../Theme'
import { Link, NavLink } from 'react-router-dom'
import img from '../../assets/logo.svg'
import { Grid } from '@material-ui/core'

export default function NavBar({ user, setUser }) {
  const loginRef = React.createRef()
  const signUpRef = React.createRef()
  const profileRef = React.createRef()
  const appointmentRef = React.createRef()

  function LoginClick() {
    loginRef.current.click()
  }
  function SignUpClick() {
    signUpRef.current.click()
  }
  function LogOut() {
    localStorage.removeItem('session_id')
    setUser({})
  }
  function ProfileClick() {
    profileRef.current.click()
  }
  function AppointmentClick() {
    appointmentRef.current.click()
  }

  return (
    <AppBar
      position="fixed"
      elevation={0}
      style={{ border: '0px solid black' }}
    >
      <Toolbar
        style={{ backgroundColor: 'white', border: '0px black solid' }}
        disableElevation
      >
        <Grid container alignItems="center">
          <Grid item alignContent="center">
            <Link to="/">
              <img
                src={img}
                style={{ height: '50px', width: '90px' }}
                alt="check up"
              ></img>
            </Link>
          </Grid>
        </Grid>

        {user && user.type !== undefined ? (
          <>
            <Button variant="text" color="inherit" onClick={AppointmentClick}>
              <img
                src="https://img.icons8.com/ios/30/000000/form.png"
                alt="applications"
              />
            </Button>
            <Button variant="text" color="inherit" onClick={ProfileClick}>
              <img
                src="https://img.icons8.com/material-outlined/30/000000/user-male-circle.png"
                alt="profile"
              />
            </Button>
            <Button
              variant="text"
              color="inherit"
              onClick={() => {
                LogOut()
              }}
            >
              LOGOUT
            </Button>
          </>
        ) : (
          <>
            <Button
              color="inherit"
              variant="text"
              style={{
                margin: '10px',
                color: theme.palette.primary.main,
                fontSize: '1rem',
              }}
              onClick={LoginClick}
            >
              Login
            </Button>
            <Button
              color="inherit"
              variant="contained"
              style={{
                backgroundColor: theme.palette.primary.main,
                fontSize: '1rem',
              }}
              disableElevation={true}
              onClick={SignUpClick}
            >
              Signup
            </Button>
          </>
        )}
      </Toolbar>
      <NavLink
        to={'/login'}
        ref={loginRef}
        style={{ display: 'none' }}
      ></NavLink>
      <NavLink
        to={'/signup'}
        ref={signUpRef}
        style={{ display: 'none' }}
      ></NavLink>
      <NavLink
        to={'/profile'}
        ref={profileRef}
        style={{ display: 'none' }}
      ></NavLink>
      <NavLink
        to={'/appointment'}
        ref={appointmentRef}
        style={{ display: 'none' }}
      ></NavLink>
    </AppBar>
  )
}
