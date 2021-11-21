import { Button, Divider, Grid, Typography } from '@material-ui/core'
import { Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import BuildDailog from '../../utils/BuildDailog'
import Schedular from '../../utils/Schedular'
import { apiRequest } from '../../utils/utils'
import AppointmentUtils from './AppointmentUtils'
import image from '../../assets/nada.svg'
import { createRef } from 'react'
import { NavLink } from 'react-router-dom'
import Loading from '../../utils/Loading'
import theme from '../../Theme'

export default function Appointment({
  user,
  setUser,
  appointment,
  setAppointment,
}) {
  const [value, changes] = useState()
  const [value2, changes2] = useState()
  const [open, setOpen] = useState(false)
  const [upLoading, setUpLoading] = useState(true)
  const [preLoading, setPreLoading] = useState(true)
  const loginRef = createRef()
  const [prevAppointment, setPrevAppointment] = useState([])
  useEffect(() => {
    if (!(user && user.user && user.user.id)) {
      loginRef.current.click()
    }
  }, [user])
  async function callApiPrev() {
    let body2 = {}
    if (user.type === 'doctor') {
      body2 = {
        session_id: localStorage.getItem('session_id'),
        lowerstamp:
          prevAppointment.length > 0
            ? prevAppointment[prevAppointment.length - 1].timestamp
            : new Date().getTime(),
        doc_id: user.user.id,
      }
    } else {
      body2 = {
        session_id: localStorage.getItem('session_id'),
        lowerstamp:
          prevAppointment.length > 0
            ? prevAppointment[prevAppointment.length - 1].timestamp
            : new Date().getTime(),
        user_id: user.user.id,
      }
    }
    await apiRequest('post', '/api/get_previous_appointment', changes2, body2)
  }
  async function callApi() {
    if (user && user.user && user.user.id) {
      if (user.type === 'doctor') {
        const body = {
          session_id: localStorage.getItem('session_id'),
          timestamp: new Date().getTime(),
          doc_id: user.user.id,
        }
        await apiRequest('post', '/api/get_appointment', changes, body)
        callApiPrev()
      } else {
        const body = {
          session_id: localStorage.getItem('session_id'),
          timestamp: new Date().getTime(),
          user_id: user.user.id,
        }
        await apiRequest('post', '/api/get_appointment', changes, body)
        callApiPrev()
      }
    }
  }
  useEffect(() => {
    if (value2 && value2.data) {
      if (value2.data.bookings && value2.data.bookings.length > 0) {
        for (let i of value2.data.bookings) {
          i.IsReadonly = true
          i.Description = i.description
          i.StartTime = i.starttime
          i.EndTime = i.endtime
          i.Subject = i.subject
          i.read = true
          i.Id = i.id
        }
        const k = [...prevAppointment]
        k.push(...value2.data.bookings)
        setPrevAppointment(k)
      }
    }
    setPreLoading(false)
  }, [value2])
  useEffect(() => {
    if (value && value.data) {
      if (value.data.bookings) {
        for (let i of value.data.bookings) {
          i.IsReadonly = true
          i.Description = i.description
          i.StartTime = i.starttime
          i.EndTime = i.endtime
          i.Subject = i.subject
          i.read = true
          i.Id = i.id
        }
        setAppointment(value.data.bookings ? value.data.bookings : [])
      }
    }
    setUpLoading(false)
  }, [value])
  useEffect(() => {
    callApi()
  }, [user])
  useEffect(() => {}, [appointment])
  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      style={{ minHeight: '100vh', marginTop: '35px' }}
    >
      <BuildDailog open={open} setOpen={setOpen}>
        <Schedular readOnly={true} bookings={appointment} setOpen={setOpen} />
      </BuildDailog>
      <Grid container item xs={12} lg={6} style={{ padding: '30px' }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Grid
            container
            item
            alignContent="flex-start"
            xs={12}
            style={{ height: '80vh', padding: '20px' }}
          >
            <Grid
              container
              item
              style={{ height: '50px' }}
              xs={12}
              justify="space-between"
              alignContent="flex-start"
            >
              <Grid item>
                <Typography className="h4">Upcoming Appointments</Typography>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => {
                    setOpen(true)
                  }}
                >
                  View In Calender
                </Button>
              </Grid>
            </Grid>
            {upLoading ? (
              <div style={{ margin: 'auto' }}>
                <Loading width="300" stroke="2" />
              </div>
            ) : (
              <Grid
                container
                item
                xs={12}
                spacing={2}
                style={{ overflowY: 'auto', height: '70vh', padding: '10px' }}
              >
                {appointment.length > 0 ? (
                  appointment.map((appoint) => {
                    return (
                      <AppointmentUtils
                        appointment={appoint}
                        User={user}
                        prev={false}
                      />
                    )
                  })
                ) : (
                  <>
                    <img
                      src={image}
                      style={{ width: '50%', margin: 'auto', opacity: '0.7' }}
                      alt="nothing"
                    />
                    <Grid
                      container
                      item
                      xs={12}
                      justify="center"
                      style={{ marginTop: '30px' }}
                    >
                      <Grid item style={{ margin: 'auto' }} justify="center">
                        <Button
                          style={{
                            margin: 'auto',
                            backgroundColor: theme.palette.dark.main,
                            color: theme.palette.primary.main,
                          }}
                          variant="contained"
                          onClick={callApiPrev}
                        >
                          Search For Doctors{' '}
                          <img
                            src="https://img.icons8.com/material-outlined/24/5FA8D3/search--v1.png"
                            alt="search"
                            style={{ marginLeft: '25px' }}
                          />
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                )}
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>

      <Grid container item xs={12} lg={6} style={{ padding: '30px' }}>
        <Paper style={{ width: '100%' }} elevation={3}>
          <Grid
            container
            item
            xs={12}
            style={{ height: '80vh', padding: '20px' }}
          >
            <Grid
              container
              item
              xs={12}
              justify="space-between"
              alignContent="flex-start"
            >
              <Grid item xs={12}>
                <Typography className="h4">Previous Appointments</Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                style={{ overflowY: 'auto', height: `70vh` }}
              >
                {prevAppointment.length > 0 ? (
                  prevAppointment.map((appoint) => {
                    return (
                      <AppointmentUtils
                        appointment={appoint}
                        User={user}
                        style={{ height: '70vh' }}
                        prev={true}
                      />
                    )
                  })
                ) : (
                  <img
                    src={image}
                    style={{ width: '50%', margin: 'auto', opacity: '0.7' }}
                    alt="nothing"
                  />
                )}
                {prevAppointment.length % 10 === 0 ? (
                  <Grid
                    container
                    item
                    xs={12}
                    justify="center"
                    style={{ marginTop: '30px' }}
                  >
                    <Grid item style={{ margin: 'auto' }} justify="center">
                      <Button
                        style={{
                          margin: 'auto',
                          backgroundColor: theme.palette.dark.main,
                          color: theme.palette.primary.main,
                        }}
                        variant="contained"
                        onClick={callApiPrev}
                      >
                        LOAD MORE
                      </Button>
                    </Grid>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <NavLink
        to="/login?path=/appointment"
        ref={loginRef}
        style={{ display: 'none' }}
      />
    </Grid>
  )
}
