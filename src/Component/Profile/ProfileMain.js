import { Button, Grid, Typography } from '@material-ui/core'
import './profile.css'
import React from 'react'
import { useState } from 'react'
import { createRef } from 'react'
import { apiRequest, genrateRandomToken, uploadFile } from '../../utils/utils'
import Bio from './doc/Bio'
import ProfilePic from './ProfilePic'
import theme from '../../Theme'
import { NavLink } from 'react-router-dom'
import Information from './doc/info/Information'
import CoverProfile from './CoverProfile'
import { Paper, TextareaAutosize, TextField } from '@mui/material'
import History from './user/History'
import BuildDailog from '../../utils/BuildDailog'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useEffect } from 'react'
import Book from './user/Book'
import Loading from '../../utils/Loading'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

require('dotenv').config()

export default function ProfileMain({ user, setUser, type, loggedIn }) {
  const [openBooking, setOpenBooking] = useState(false)
  const u = window.location.href.split('/')
  const url = u.length === 4 ? 'profile' : u[4]
  const [openHistory, setOpenHistory] = useState(false)
  const [file, setFile] = useState()
  const [saveLoading, setSaveLoading] = useState(false)
  const [coverLoading, setCoverLoading] = useState(false)
  const [profileLoading, setProfileLoading] = useState(false)
  const [fileType, setFileType] = useState('')
  const [profilePreview, setProfilePreview] = useState()
  const [previewImage, setPreviewImage] = useState(false)
  const [cover, setCover] = useState()
  const [coverFileType, setCoverFileType] = useState('')
  const [bio, setBio] = useState(
    user && user.user && user.user.bio ? user.user.bio : '',
  )
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const [error, setError] = useState({})
  const [coverPreview, setCoverPreview] = useState()
  const [previewCoverImage, setPreviewCoverImage] = useState(false)
  const [coverUploaded, setCoverUploaded] = useState(false)
  const [profileUploaded, setProfileUploaded] = useState(false)
  const [historyName, setHistoryName] = useState('')
  const [historyInfo, setHistoryInfo] = useState('')
  const [historyFile, setHistoryFile] = useState()
  const [days, setDays] = useState(
    user && user.user && user.user.days ? user.user.days : '',
  )
  const [timeing, setTimeing] = useState(
    user && user.user && user.user.timeing ? user.user.timeing : '',
  )
  const [newHistory, setNewHistory] = useState([])
  const showProfileRef = createRef()
  const profileRef = createRef()
  const coverRef = createRef()
  const profileActionRef = createRef()
  const [hospital, setHospital] = useState(
    user && user.user && user.user.hospital ? user.user.hospital : '',
  )
  const [fees, setFees] = useState(
    user && user.user && user.user.fees ? user.user.fees : '',
  )
  const [degrees, setDegrees] = useState(
    user && user.user && user.user.degrees ? user.user.degrees : '',
  )
  const [treatment, setTreatment] = useState(
    user && user.user && user.user.treatment1
      ? user.user.treatment1 +
          ', ' +
          user.user.treatment2 +
          ', ' +
          user.user.treatment3 +
          ', ' +
          user.user.treatment4 +
          ', '
      : '',
  )

  async function profileAction(k) {
    if (k === 'yo') {
      profileActionRef.current.click()
    } else if (k === 'save') {
      saveProfile(this)
      setSaveLoading(true)
    } else if (url === 'profile' && user.type === 'patient')
      setOpenHistory(true)
    else if (url === 'profile' && type !== 'edit') {
      profileActionRef.current.click()
    } else if (url === 'profile' && type === 'edit') {
      saveProfile(this)
      setSaveLoading(true)
    } else if (type === 'info' && user.type === 'doctor') {
      if (loggedIn && loggedIn.type === 'doctor') {
        setOpenSnackbar(true)
        setError({
          error:
            "Doctors can't book appointments as of now! Please try Again Later",
        })
      } else setOpenBooking(true)
    }
  }
  useEffect(() => {
    setBio(user && user.user && user.user.bio ? user.user.bio : '')
    setDegrees(user && user.user && user.user.degrees ? user.user.degrees : '')
    setFees(user && user.user && user.user.fees ? user.user.fees : '')
    setDays(user && user.user && user.user.days ? user.user.days : '')
    setTimeing(user && user.user && user.user.timeing ? user.user.timeing : '')
    setHospital(
      user && user.user && user.user.hospital ? user.user.hospital : '',
    )
    setTreatment(
      user && user.user && user.user.treatment1
        ? user.user.treatment1 +
            ', ' +
            user.user.treatment2 +
            ', ' +
            user.user.treatment3 +
            ', ' +
            user.user.treatment4 +
            ', '
        : '',
    )
  }, [user])
  function getHistoryFile(e) {
    setHistoryFile(e.target.files[0])
  }
  function profileClick() {
    profileRef.current.click()
  }
  function coverClick() {
    coverRef.current.click()
  }
  function useless() {}
  const saveProfile = async (ref) => {
    const u = { ...user }
    u.user['hospital'] = hospital
    u.user['bio'] = bio
    u.user['treatment1'] = treatment.split(',')[0]
      ? treatment.split(',')[0].toLowerCase().trim()
      : ''
    u.user['treatment2'] = treatment.split(',')[1]
      ? treatment.split(',')[1].toLowerCase().trim()
      : ''
    u.user['treatment3'] = treatment.split(',')[2]
      ? treatment.split(',')[2].toLowerCase().trim()
      : ''
    u.user['treatment4'] = treatment.split(',')[3]
      ? treatment.split(',')[3].toLowerCase().trim()
      : ''
    u.user['fees'] = fees
    u.user['days'] = days
    u.user['timeing'] = timeing
    u.user['type'] = user.type
    u.user['degrees'] = degrees
    u.user['id'] = localStorage.getItem('session_id').split('!id@')[0]
    u.session_id = localStorage.getItem('session_id')
    setUser(u)
    await apiRequest('post', '/api/update_profile', useless, u)
    setSaveLoading(false)
    document.getElementById('to_profile').click()
  }
  function onFileChange(e, typ) {
    try {
      if (typ === 'profile') {
        let file = e.target.files[0]
        setFileType(file.type)
        setFile(file)
        setPreviewImage(true)
        setProfileUploaded(false)
        let reader = new FileReader()
        let url = reader.readAsDataURL(file)
        reader.onloadend = function (e) {
          setProfilePreview(reader.result)
        }
      } else {
        let file = e.target.files[0]
        setCoverFileType(file.type)
        setCover(file)
        setPreviewCoverImage(true)
        setCoverUploaded(false)
        let reader = new FileReader()
        let url = reader.readAsDataURL(file)
        reader.onloadend = function (e) {
          setCoverPreview(reader.result)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  async function fileUpload(type) {
    let storageAccount = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT
    const id = genrateRandomToken()
    if (type === 'cover') {
      let u = { ...user }
      u.user[
        'cover'
      ] = `https://${storageAccount}.blob.core.windows.net/${user.user.id}/${id}.PNG`
      setUser(u)
      setCoverUploaded(true)
      setCoverLoading(true)
      await uploadFile(cover, id, 'PNG', user.user.id)
      setCoverLoading(false)
      return
    }
    if (type === 'profile') {
      let u = { ...user }
      u.user[
        'profile'
      ] = `https://${storageAccount}.blob.core.windows.net/${user.user.id}/${id}.PNG`
      setUser(u)
      setProfileUploaded(true)
      setProfileLoading(true)
      await uploadFile(file, id, 'PNG', user.user.id)
      setProfileLoading(false)
      return
    } else {
      if (
        historyName === '' ||
        historyName === '' ||
        historyFile === undefined
      ) {
        setError({ error: 'Invalid Input Details' })
        setOpenSnackbar(true)
        return
      }
      await uploadFile(historyFile, id, 'pdf', user.user.id)
      const time = new Date()

      const body = {
        name: historyName,
        info: historyInfo,
        link: `https://${storageAccount}.blob.core.windows.net/${user.user.id}/${id}.pdf`,
        timestamp: time.getTime(),
        user_id: user.user.id,
      }
      await apiRequest('post', '/api/create_history', fake, body)
      setNewHistory([body])
      setHistoryFile()
      setHistoryInfo('')
      setHistoryName('')
    }
  }
  function fake(value) {
    if (value.data) {
      if (value.data.error) {
        setError(value.data)
      } else setError(value.data)
      setOpenSnackbar(true)
    }
  }
  function handleClose() {
    setOpenSnackbar(false)
  }
  return (
    <Grid container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={error.error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {error.error ? error.error : error.success}
        </Alert>
      </Snackbar>
      <Book
        openBooking={openBooking}
        setOpenBooking={setOpenBooking}
        doc={user}
        user={loggedIn}
      />
      <BuildDailog
        open={openHistory}
        setOpen={setOpenHistory}
        saveChanges={() => fileUpload()}
        title="Upload History"
      >
        <Grid container>
          <Grid
            container
            item
            xs={12}
            justify="space-evenly"
            alignContent="center"
          >
            <Grid item xs={12} md={6}>
              <TextField
                label="name"
                fullWidth
                value={historyName}
                onChange={(e) => setHistoryName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextareaAutosize
                placeholder="Additional Information"
                style={{ margin: '0px !important' }}
                minRows={5}
                value={historyInfo}
                onChange={(e) => setHistoryInfo(e.target.value)}
                className="profileBio"
                maxLength={100}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              style={{ margin: '20px' }}
              alignContent="center"
              alignItems="center"
              justify="center"
            >
              <input
                type="file"
                style={{ margin: '20px !important' }}
                accept="application/pdf"
                onChange={(e) => getHistoryFile(e)}
              />
            </Grid>
          </Grid>
        </Grid>
      </BuildDailog>
      <Grid container item xs={12}>
        <CoverProfile
          user={user}
          setUser={setUser}
          type={type}
          coverLoading={coverLoading}
          coverClick={coverClick}
          previewCoverImage={previewCoverImage}
          fileUpload={fileUpload}
          coverPreview={coverPreview}
          coverUploaded={coverUploaded}
        />
        <Grid container item xs={12}>
          <ProfilePic
            user={user}
            profileClick={profileClick}
            previewImage={previewImage}
            profileLoading={profileLoading}
            fileUpload={fileUpload}
            profilePreview={profilePreview}
            type={type}
            profileUploaded={profileUploaded}
          />

          <Grid container item className="profileName">
            <Grid
              container
              item
              style={{ marginTop: '10px' }}
              className="profileName1"
            >
              {user && user.user && user.user.name ? (
                <>
                  <Grid item>
                    <Typography className="h4" style={{ fontWeight: '500' }}>
                      {user.user.name}
                    </Typography>
                  </Grid>
                </>
              ) : null}
            </Grid>
            <Grid container item className="profileName1">
              {user.type === 'patient' ? null : type === 'edit' ? (
                <Grid item>
                  <TextField
                    fullWidth
                    label="qualifications"
                    value={degrees}
                    size="small"
                    margin="normal"
                    variant="filled"
                    onChange={(e) => setDegrees(e.target.value)}
                  />
                </Grid>
              ) : (
                <Grid item>
                  <Typography
                    className="subtitle1"
                    style={{ fontWeight: '600' }}
                  >
                    {degrees}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          {type === 'edit' ? (
            <Grid item className="profileAction">
              <Button
                fullWidth
                variant="contained"
                disabled={saveLoading}
                style={
                  !saveLoading
                    ? {
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                      }
                    : {
                        backgroundColor: theme.palette.dark.main,
                        color: 'white',
                      }
                }
                onClick={() => profileAction('save')}
              >
                {saveLoading ? (
                  <Loading width="50" color="#FFF" stroke="10" />
                ) : (
                  <>save</>
                )}
              </Button>
            </Grid>
          ) : (
            <>
              {user.type === 'patient' && type === 'info' ? null : (
                <Grid item className="profileAction">
                  <Button
                    fullWidth
                    variant="contained"
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      zIndex: '100',
                    }}
                    onClick={profileAction}
                  >
                    {user.type === 'patient'
                      ? 'upload HISTORY'
                      : url === 'profile'
                      ? 'EDIT PROFILE'
                      : 'BOOK'}
                  </Button>
                </Grid>
              )}

              {user.type === 'patient' && type === 'profile' ? (
                <Grid item className="profileAction">
                  <Button
                    fullWidth
                    variant="contained"
                    className="edit_profile"
                    style={{
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                    }}
                    onClick={() => profileAction('yo')}
                  >
                    {user.type === 'patient' ? 'EDIT PROFILE' : null}
                  </Button>
                </Grid>
              ) : null}
            </>
          )}
        </Grid>
        {user.type === 'doctor' ? (
          <>
            <Information
              hospital={hospital}
              setHospital={setHospital}
              fees={fees}
              setFees={setFees}
              treatment={treatment}
              setTreatment={setTreatment}
              days={days}
              setDays={setDays}
              timeing={timeing}
              setTimeing={setTimeing}
              type={type}
            />
            <Bio type={type} bio={bio} setBio={setBio} />
          </>
        ) : (
          <Grid
            container
            xs={12}
            item
            justify="center"
            style={{ margin: '50px 30px', width: '90% !important' }}
          >
            <Grid item xs={12} className="history">
              <History user={user} newHistory={newHistory} />
            </Grid>
          </Grid>
        )}
      </Grid>
      <input
        type="file"
        style={{ display: 'none' }}
        ref={profileRef}
        accept="image/png"
        onChange={(e) => onFileChange(e, 'profile')}
      />
      <input
        type="file"
        style={{ display: 'none' }}
        ref={coverRef}
        accept="image/png"
        onChange={(e) => onFileChange(e, 'cover')}
      />
      <NavLink
        ref={profileActionRef}
        to="/edit-profile"
        style={{ display: 'none' }}
      />
      <NavLink
        ref={showProfileRef}
        to="/profile"
        style={{ display: 'none' }}
        id="to_profile"
      />
    </Grid>
  )
}
