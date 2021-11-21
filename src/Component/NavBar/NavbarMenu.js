import * as React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Typography from '@mui/material/Typography'
import { NavLink } from 'react-router-dom'
import { createRef } from 'react'

export default function NavbarMenu({
  user,
  LogOut,
  open,
  anchorEl,
  setAnchorEl,
  handleClick,
  handleClose,
  setSearchOpen,
  appointmentRef,
}) {
  const profileRef = createRef()
  return (
    <div>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuList
          onClick={() => {
            profileRef.current.click()
            handleClose()
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="menuList">
            <div>
              <img
                src={
                  user.user.profile
                    ? user.user.profile
                    : 'https://img.icons8.com/material-outlined/30/1F4F6B/user-male-circle.png'
                }
                style={{
                  height: '40px !important',
                  width: '40px !important',
                  borderRadius: '25px',
                }}
                className="profileImage"
                alt="profile"
              ></img>
            </div>
            <Typography className="subtitle1" style={{ marginLeft: '10px' }}>
              Profile
            </Typography>
          </div>
        </MenuList>
        <MenuList
          onClick={() => {
            setSearchOpen(true)
            handleClose()
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="menuList">
            <img
              src="https://img.icons8.com/material-outlined/24/1F4F6B/search--v1.png"
              alt="Search"
            />
            <Typography
              className="subtitle1"
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Search
            </Typography>
          </div>
        </MenuList>
        <MenuList
          onClick={() => {
            appointmentRef.current.click()
            handleClose()
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className="menuList">
            <img
              src="https://img.icons8.com/fluency-systems-regular/28/1f4f68/form.png"
              alt="application"
            />
            <Typography
              className="subtitle1"
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Applications
            </Typography>
          </div>
        </MenuList>
        <Divider />
        <MenuList onClick={LogOut} style={{ cursor: 'pointer' }}>
          <div className="menuList">
            <img
              src="https://img.icons8.com/ios-filled/24/1F4F6B/logout-rounded-left.png"
              alt="logout"
            />
            <Typography
              className="subtitle1"
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            >
              Logout
            </Typography>
          </div>
        </MenuList>
      </Menu>
      <NavLink
        to={'/profile'}
        ref={profileRef}
        style={{ display: 'none' }}
      ></NavLink>
    </div>
  )
}
