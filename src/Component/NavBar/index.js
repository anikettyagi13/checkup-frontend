import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar'

import { styled, alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import theme from '../../Theme'
import { Link, NavLink } from 'react-router-dom'
import InputBase from '@mui/material/InputBase'
import img from '../../assets/logo.svg'
import { Grid } from '@material-ui/core'
import './navbar.css'
import NavbarManu from './NavbarMenu'
import SearchDailog from '../Search/Search'
import { useLocation } from 'react-router-dom'
// import SearchIcon from '@mui/icons-material/Search'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  margin: 'auto !important',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  color: '#1F4F6B',
  fontFamily: 'Poppins',
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export default function NavBar({ user, setUser }) {
  const search = useLocation().search
  const path = new URLSearchParams(search).get('path')
  const loginRef = React.createRef()
  const signUpRef = React.createRef()
  const profileRef = React.createRef()
  const appointmentRef = React.createRef()
  const [searchOpen, setSearchOpen] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

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
        {searchOpen ? (
          <SearchDailog open={searchOpen} setOpen={setSearchOpen} />
        ) : null}
        <div className="search">
          <Search
            onClick={() => {
              console.log('sfkp')
              setSearchOpen(true)
            }}
          >
            <SearchIconWrapper>
              <img
                src="https://img.icons8.com/material-outlined/24/5FA8D3/search--v1.png"
                alt="search"
              />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>
        {user && user.type !== undefined ? (
          <>
            <div className="hidden600 flex">
              <Button variant="text" color="inherit" onClick={AppointmentClick}>
                <img
                  src="https://img.icons8.com/fluency-systems-regular/36/5FA8D3/form.png"
                  alt="application"
                />
              </Button>
              <IconButton
                variant="text"
                color="inherit"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <img
                  src={
                    user.user.profile
                      ? user.user.profile
                      : 'https://img.icons8.com/material-outlined/30/1F4F6B/user-male-circle.png'
                  }
                  style={{
                    height: '40px !important',
                    width: '40px !important',
                    border: '2px solid #1f4f68',
                    padding: '2px',
                    borderRadius: '25px',
                  }}
                  className="profileImage"
                  alt="profile"
                ></img>
              </IconButton>
              <NavbarManu
                user={user}
                LogOut={LogOut}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleClick={handleClick}
                handleClose={handleClose}
                setSearchOpen={setSearchOpen}
                appointmentRef={appointmentRef}
              />
            </div>
            <div className="show600">
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <img
                  src="https://img.icons8.com/ios-glyphs/30/000000/menu-2.png"
                  alt="menu"
                />
              </IconButton>
              <NavbarManu
                user={user}
                LogOut={LogOut}
                open={open}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                handleClick={handleClick}
                setSearchOpen={setSearchOpen}
                handleClose={handleClose}
                appointmentRef={appointmentRef}
              />
            </div>
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
        to={`/login?path=${path}`}
        ref={loginRef}
        style={{ display: 'none' }}
      ></NavLink>
      <NavLink
        to={`/signup?path=${path}`}
        ref={signUpRef}
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
