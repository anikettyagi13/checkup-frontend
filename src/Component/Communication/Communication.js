import {
  Button,
  Grid,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core'
import React, { createRef, useEffect, useState } from 'react'
import { apiRequest, genrateRandomToken, uploadFile } from '../../utils/utils'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import BuildDailog from '../../utils/BuildDailog'
import VideoComponent from './VideoComponent'
import './communication.css'
import AcceptCall from './AcceptCall'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const {
  CallClient,
  VideoStreamRenderer,
  LocalVideoStream,
} = require('@azure/communication-calling')
const {
  AzureCommunicationTokenCredential,
} = require('@azure/communication-common')

const { AzureLogger, setLogLevel } = require('@azure/logger')
let callAgent
var deviceManager
let call
let incomingCall
let localVideoStream
let localVideoStreamRenderer
let video
navigator.getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia
let boolean = false
export default function Communication({ properties, user }) {
  const [appointment, setAppointment] = useState(
    properties.location.appointment ? properties.location.appointment : {},
  )
  const [userInfo, setUserInfo] = useState({})
  const [value, changes] = useState()
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [startButtonDisabled, setStartButtonDisabled] = useState(true)
  const [acceptButtonDisabled, setAcceptButtonDisabled] = useState(true)
  const [hangupButtonDisabled, setHangupButtonDisabled] = useState(true)
  const [infoOpen, setInfoOpen] = useState(false)
  const videoRef = createRef()
  const [info, setInfo] = useState('')
  const [openHistory, setOpenHistory] = useState(false)
  const [selfToken, setSelfToken] = useState({})
  const [historyFile, setHistoryFile] = useState()
  const [historyName, setHistoryName] = useState('')
  const [historyInfo, setHistoryInfo] = useState('')
  const [anotherToken, setAnotherToken] = useState({})
  const [value2, changes2] = useState()
  const [value3, changes3] = useState()
  const [videoOpen, setVideoOpen] = useState(true)
  const [localVideo, setLocalVideo] = useState(true)
  let startCallButton = createRef()
  let hangUpCallButton = createRef()
  let acceptCallButton = createRef()
  let startVideoButton = createRef()
  let stopVideoButton = createRef()
  let connectedLabel = createRef()
  const [ringing1, setRinging1] = useState(false)
  async function getAppointmentInfo() {
    await apiRequest('post', '/api/get_appointment_info', changes, {
      session_id: localStorage.getItem('session_id'),
      id: properties.location.pathname.split('/')[2],
    })
  }
  useEffect(() => {
    return async function cleanup() {
      try {
        // const video = document.getElementById('video-ref')
        if (video) {
          const stream = video.srcObject
          const tracks = stream.getTracks()
          tracks.forEach(function (track) {
            track.stop()
          })
        } else {
          await call.stopVideo()
        }
      } catch (e) {}
    }
  }, [])
  async function getToken(appointment) {
    console.log(appointment)
    let body = {
      id: appointment.user_id,
      session_id: localStorage.getItem('session_id'),
    }
    let body2 = {
      session_id: localStorage.getItem('session_id'),
      id: appointment.doc_id,
    }
    console.log(body, body2)
    await apiRequest('post', '/api/get_communication_id', changes2, body)
    await apiRequest('post', '/api/get_communication_id', changes3, body2)
  }
  useEffect(() => {
    if (value2 && value2.data) {
      if (value2.data.token) {
        console.log(value2.data.token)
        if (user.user && user.user.id === value2.data.token.user_id) {
          setSelfToken(value2.data.token)
        } else {
          setAnotherToken(value2.data.token)
        }
      }
    }
  }, [value2])
  useEffect(() => {
    if (value3 && value3.data) {
      if (value3.data.token) {
        console.log(value3.data.token)
        if (user && user.user && user.user.id !== value3.data.token.user_id) {
          setAnotherToken(value3.data.token)
        } else {
          setSelfToken(value3.data.token)
        }
      }
    }
  }, [value3])
  useEffect(() => {
    if (value && value.data) {
      if (!value.data.error) {
        let k = 1
        if (user.type === 'patient') {
          if (user.user && user.user.id !== value.data.user_id) {
            k = 0
            setInfo('Some Error Occured!')
            setInfoOpen(true)
          }
        } else {
          if (user.user && user.user.id !== value.data.doc_id) {
            k = 0
            setInfo('Some Error Occured!')
            setInfoOpen(true)
          }
        }
        if (k === 1) {
          setAppointment(value.data)
          getToken(value.data)
        }
      } else {
        setInfo(value.data.error)
        setInfoOpen(true)
      }
    }
  }, [value])
  useEffect(() => {
    async function callApi() {
      if (!properties.location.appointment) {
        await getAppointmentInfo()
      } else {
        await getAppointmentInfo()
      }
    }
    callApi()
    setTimeout(() => {
      if (!boolean) {
        setInfo('Some Error Occured! Reloading might help')
        setInfoOpen(true)
      }
    }, 20000)
  }, [])
  // Make sure to install the necessary dependencies

  // Set the log level and output
  setLogLevel('verbose')
  AzureLogger.log = (...args) => {}
  useEffect(() => {
    if (selfToken.token) intializeCallFunction()
  }, [selfToken])
  function UserInfo(data) {
    if (data.data) {
      setUserInfo(data.data)
      setRinging1(true)
    }
  }
  async function getUserInfo() {
    await apiRequest('get', `/api/profile/${anotherToken.user_id}`, UserInfo)
  }
  async function intializeCallFunction() {
    try {
      const callClient = new CallClient()
      let tokenCredential = new AzureCommunicationTokenCredential(
        selfToken.token.trim(),
      )
      deviceManager = await callClient.getDeviceManager()
      await deviceManager.askDevicePermission({ video: true })
      await deviceManager.askDevicePermission({ audio: true })
      callAgent = await callClient.createCallAgent(tokenCredential)
      // Set up a camera device to use.

      // Listen for an incoming call to accept.
      callAgent.on('incomingCall', async (args) => {
        try {
          incomingCall = args.incomingCall
          await getUserInfo()
        } catch (error) {
          console.error(error)
        }
      })
      boolean = true
      setStartButtonDisabled(false)
    } catch (error) {
      setInfo('Some Error Occured! Reloading might help')
      setInfoOpen(true)
      console.error(error.message)
    }
  }
  const StartButtonClick = async () => {
    try {
      const localVideoStream = await createLocalVideoStream()
      const videoOptions = localVideoStream
        ? { localVideoStreams: [localVideoStream] }
        : undefined
      call = callAgent.startCall(
        [{ communicationUserId: anotherToken.communicationuserid }],
        { videoOptions },
      )
      async function ringing() {
        await apiRequest('post', '/api/create_notification', fake, {
          session_id: localStorage.getItem('session_id'),
          to: anotherToken.user_id,
          from: user.user.id,
          message: {
            message: 'INCOMING CALL',
            action: {
              title: 'JOIN CALL',
              pathName: `/appointment/${appointment.id}`,
            },
          },
        })
        function fake() {}
      }
      ringing()
      // Subscribe to the call's properties and events.
      subscribeToCall(call)
    } catch (error) {
      console.error(error)
    }
  }

  const AcceptButtonClick = async () => {
    try {
      const localVideoStream = await createLocalVideoStream()
      const videoOptions = localVideoStream
        ? { localVideoStreams: [localVideoStream] }
        : undefined
      call = await incomingCall.accept({ videoOptions })
      setRinging1(false)
      // Subscribe to the call's properties and events.
      subscribeToCall(call)
    } catch (error) {
      console.error(error)
    }
  }
  const displayLocalVideoStream = async () => {
    try {
      localVideoStreamRenderer = new VideoStreamRenderer(localVideoStream)
      const view = await localVideoStreamRenderer.createView()
      const ele = document.getElementById('local_video_container')
      if (ele.childNodes.length === 0)
        document
          .getElementById('local_video_container')
          .appendChild(view.target)
    } catch (error) {
      console.error(error)
    }
  }
  const subscribeToCall = (call) => {
    try {
      // Inspect the initial call.id value.
      //Subsribe to call's 'idChanged' event for value changes.
      call.on('idChanged', () => {
        // console.log(`Call Id changed: ${call.id}`)
      })

      // Inspect the initial call.state value.
      // Subscribe to call's 'stateChanged' event for value changes.
      call.on('stateChanged', async () => {
        if (call.state === 'Connected') {
          // connectedLabel.hidden = false
          setAcceptButtonDisabled(true)
          setHangupButtonDisabled(false)
          setLocalVideo(false)
        } else if (call.state === 'Disconnected') {
          setStartButtonDisabled(false)
          setHangupButtonDisabled(true)
          setLocalVideo(true)
          setVideoOpen(false)
        }
      })

      call.localVideoStreams.forEach(async (lvs) => {
        localVideoStream = lvs
        await displayLocalVideoStream()
      })
      call.on('localVideoStreamsUpdated', (e) => {
        e.added.forEach(async (lvs) => {
          localVideoStream = lvs
          await displayLocalVideoStream()
        })
        e.removed.forEach((lvs) => {
          removeLocalVideoStream()
        })
      })

      // Inspect the call's current remote participants and subscribe to them.
      call.remoteParticipants.forEach((remoteParticipant) => {
        subscribeToRemoteParticipant(remoteParticipant)
      })
      // Subscribe to the call's 'remoteParticipantsUpdated' event to be
      // notified when new participants are added to the call or removed from the call.
      call.on('remoteParticipantsUpdated', (e) => {
        // Subscribe to new remote participants that are added to the call.
        e.added.forEach((remoteParticipant) => {
          subscribeToRemoteParticipant(remoteParticipant)
        })
        // Unsubscribe from participants that are removed from the call
        e.removed.forEach((remoteParticipant) => {
          console.log('Remote participant removed from the call.')
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  const subscribeToRemoteParticipant = (remoteParticipant) => {
    try {
      // Inspect the initial remoteParticipant.state value.
      // Subscribe to remoteParticipant's 'stateChanged' event for value changes.
      remoteParticipant.on('stateChanged', () => {
        console.log(
          `Remote participant state changed: ${remoteParticipant.state}`,
        )
      })

      // Inspect the remoteParticipants's current videoStreams and subscribe to them.
      remoteParticipant.videoStreams.forEach((remoteVideoStream) => {
        subscribeToRemoteVideoStream(remoteVideoStream)
      })
      // Subscribe to the remoteParticipant's 'videoStreamsUpdated' event to be
      // notified when the remoteParticiapant adds new videoStreams and removes video streams.
      remoteParticipant.on('videoStreamsUpdated', (e) => {
        // Subscribe to new remote participant's video streams that were added.
        e.added.forEach((remoteVideoStream) => {
          subscribeToRemoteVideoStream(remoteVideoStream)
        })
        // Unsubscribe from remote participant's video streams that were removed.
        e.removed.forEach((remoteVideoStream) => {
          console.log('Remote participant video stream was removed.')
        })
      })
    } catch (error) {
      console.error(error)
    }
  }
  const subscribeToRemoteVideoStream = async (remoteVideoStream) => {
    // Create a video stream renderer for the remote video stream.
    let videoStreamRenderer = new VideoStreamRenderer(remoteVideoStream)
    let view
    const renderVideo = async () => {
      try {
        // Create a renderer view for the remote video stream.
        view = await videoStreamRenderer.createView()
        // Attach the renderer view to the UI.
        // remoteVideoContainer.hidden = false
        document
          .getElementById('remote_video_container')
          .appendChild(view.target)
      } catch (e) {
        console.warn(
          `Failed to createView, reason=${e.message}, code=${e.code}`,
        )
      }
    }

    remoteVideoStream.on('isAvailableChanged', async () => {
      // Participant has switched video on.
      if (remoteVideoStream.isAvailable) {
        await renderVideo()

        // Participant has switched video off.
      } else {
        if (view) {
          view.dispose()
          view = undefined
        }
      }
    })

    // Participant has video on initially.
    if (remoteVideoStream.isAvailable) {
      await renderVideo()
    }
  }

  const StartVideoClick = async () => {
    try {
      if (!videoOpen) {
        if (localVideo) {
          navigator.mediaDevices
            .getUserMedia({ video: { width: 300 } })
            .then((stream) => {
              video = document.getElementById('video-ref')
              video.srcObject = stream
              video.play()
            })
            .catch((err) => {
              console.error('error:', err)
            })
        } else {
          const localVideoStream = await createLocalVideoStream()
          await call.startVideo(localVideoStream)
        }
        setVideoOpen(true)
      } else {
        if (localVideo) {
          const video = document.getElementById('video-ref')
          const stream = video.srcObject
          const tracks = stream.getTracks()
          tracks.forEach(function (track) {
            track.stop()
          })
        } else {
          await call.stopVideo(localVideoStream)
        }
        setVideoOpen(false)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // Stop your local video stream.
  // This will stop your local video stream from being sent to remote participants.
  const StopVideoClick = async () => {
    try {
    } catch (error) {
      console.error(error)
    }
  }
  // Remove your local video stream preview from your UI
  const createLocalVideoStream = async () => {
    const camera = (await deviceManager.getCameras())[0]
    if (camera) {
      return new LocalVideoStream(camera)
    } else {
    }
  }
  const removeLocalVideoStream = async () => {
    try {
      localVideoStreamRenderer.dispose()
    } catch (error) {
      console.error(error)
    }
  }
  const EndButtonClick = async () => {
    await call.hangUp()

    await apiRequest('post', '/api/end_call', fake, {
      session_id: localStorage.getItem('session_id'),
      appointment: appointment,
    })
    // getVideo()

    setOpenHistory(true)
  }
  function fake() {}
  function handleClose() {
    setInfoOpen(false)
  }
  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        video = document.getElementById('video-ref')
        video.srcObject = stream
        video.play()
      })
      .catch((err) => {
        console.error('error:', err)
      })
  }
  useEffect(() => {
    getVideo()
  }, [])

  async function fileUpload() {
    let storageAccount = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT
    const id = genrateRandomToken()
    if (historyName === '' || historyFile === undefined) {
      setInfo('Input name of the file and select file to upload')
      setInfoOpen(true)
    } else {
      await uploadFile(historyFile, id, 'pdf', appointment.user_id)
      const time = new Date()
      const body = {
        name: historyName,
        info: historyInfo,
        link: `https://${storageAccount}.blob.core.windows.net/${appointment.user_id}/${id}.pdf`,
        timestamp: time.getTime(),
        user_id: appointment.user_id,
      }
      await apiRequest('post', '/api/create_history', fake, body)
      setHistoryFile()
      setHistoryInfo('')
      setHistoryName('')
      setOpenHistory(false)
    }
  }
  function getHistoryFile(e) {
    setHistoryFile(e.target.files[0])
  }
  return (
    <Grid container style={{ backgroundColor: '#f5f5f5' }}>
      {ringing1 ? (
        <AcceptCall
          AcceptButtonClick={AcceptButtonClick}
          setRinging={setRinging1}
          user={userInfo}
        />
      ) : null}
      <BuildDailog
        open={openHistory}
        setOpen={setOpenHistory}
        saveChanges={() => fileUpload()}
        title="Patient History"
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
                variant="standard"
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

      <Grid container>
        <Snackbar
          open={infoOpen}
          severity="warning"
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert severity="warning">{info}</Alert>
        </Snackbar>
      </Grid>
      {localVideo ? (
        <Grid
          container
          style={{ zIndex: 0 }}
          item
          xs={12}
          justify="center"
          // style={{ marginTop: '10px' }}
        >
          <Grid item className="videoContainer">
            <video ref={videoRef} id="video-ref" className="video"></video>
          </Grid>
        </Grid>
      ) : null}
      <Grid
        container
        item
        xs={12}
        style={{ position: 'absolute', top: '60px' }}
      >
        <Grid container item xs={12} justify="center">
          <Grid item className="videoContainer">
            <div id="remote_video_container" className="video" />
          </Grid>
        </Grid>
        <Grid item style={{ borderRadius: '10px' }}>
          <div id="local_video_container" className="myVideo"></div>
        </Grid>
      </Grid>

      <br />
      <br />

      <Grid
        container
        item
        justify="space-between"
        className="moreIcons"
        alignItems="center"
      >
        <Grid
          item
          container
          justify="space-between"
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
        >
          <Button onClick={StartVideoClick} ref={startVideoButton}>
            {videoOpen ? (
              <div
                style={{
                  height: '40px',
                  width: '40px',
                  borderRadius: '20px',
                  backgroundColor: '#ff3333',
                  display: 'grid',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src="https://img.icons8.com/ios/24/FFFFFF/no-video--v1.png" />
              </div>
            ) : (
              <div
                style={{
                  height: '40px',
                  width: '40px',
                  borderRadius: '20px',
                  backgroundColor: '#7EC9A6',
                  display: 'grid',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src="https://img.icons8.com/ios/24/FFFFFF/no-video--v2.png" />
              </div>
            )}
          </Button>
          {startButtonDisabled ? (
            <Button>
              <div class="loader"></div>
            </Button>
          ) : (
            <>
              {localVideo ? (
                <Button onClick={StartButtonClick}>
                  {console.log(localVideo, 'localVideo')}
                  <div
                    style={{
                      height: '40px',
                      width: '40px',
                      borderRadius: '20px',
                      backgroundColor: '#7EC9A6',
                      display: 'grid',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="https://img.icons8.com/external-those-icons-fill-those-icons/24/FFFFFF/external-call-mobile-telephone-those-icons-fill-those-icons.png" />
                  </div>
                </Button>
              ) : user && user.type === 'doctor' ? (
                <Button
                  ref={hangUpCallButton}
                  onClick={EndButtonClick}
                  type="button"
                  disabled={hangupButtonDisabled}
                >
                  <div
                    style={{
                      height: '40px',
                      width: '40px',
                      borderRadius: '20px',
                      backgroundColor: '#ff3333',
                      display: 'grid',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <img src="https://img.icons8.com/ios-glyphs/24/FFFFFF/phone-disconnected.png" />
                  </div>
                </Button>
              ) : null}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

window.setTimeout(() => {
  try {
  } catch (e) {}
}, 0)
