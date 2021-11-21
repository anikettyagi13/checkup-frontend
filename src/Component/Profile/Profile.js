import { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/utils'
import ProfileMain from './ProfileMain'
import './profile.css'
import { NavLink } from 'react-router-dom'
import { createRef } from 'react'
import { Grid } from '@material-ui/core'
import Loading from '../../utils/Loading'
export default function Profile({ user, setUser, type, url }) {
  const [loading, setLoading] = useState(false)
  const LoginRef = createRef()
  async function load() {
    if (type === 'info') {
      const id = window.location.href.split('/')[4]
      await apiRequest('get', `/api/profile/${id}`, setChanges)
    } else {
      setUserInfo(user)
    }
  }

  const [userInfo, setUserInfo] = useState()
  const [value, setChanges] = useState()
  useEffect(() => {
    if (value && value.data) {
      setUserInfo(value.data)
    }
  }, [value])
  useEffect(() => {
    load()
  }, [url])
  useEffect(() => {
    console.log(user, 'users######################')
    if (!(user && user.type && user.user.id)) {
      LoginRef.current.click()
    }
    load()
  }, [user])
  useState(() => {
    if (type === 'edit') {
      setUser(userInfo)
    }
  }, [userInfo])

  return (
    <>
      {userInfo && userInfo.type !== undefined ? (
        // console.log('yo')
        <ProfileMain
          user={userInfo}
          setUser={setUserInfo}
          type={type}
          loggedIn={user}
        />
      ) : (
        <Grid
          container
          justify="center"
          alignContent="center"
          style={{ height: '100vh' }}
        >
          <Loading width="300" />
        </Grid>
      )}
      <NavLink
        to={`/login?path=${
          type === 'profile'
            ? '/profile'
            : type === 'info'
            ? `/info/${window.location.href.split('/')[4]}`
            : '/edit-profile'
        }`}
        ref={LoginRef}
        style={{ display: 'none' }}
      />
    </>
  )
}
