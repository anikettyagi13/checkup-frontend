import { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/utils'
import ProfileMain from './ProfileMain'
import './profile.css'
export default function Profile({ user, setUser, type, url }) {
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
        <>{userInfo && userInfo.type ? userInfo.type === 'doctor' : null}</>
      )}
    </>
  )
}
