import { Button, Grid, Typography } from '@material-ui/core'
import { Paper } from '@mui/material'
import { createRef, useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { apiRequest } from '../../utils/utils'
import moment from 'moment'

export default function AppointmentUtils({ appointment, User, prev }) {
  const [user, setUser] = useState({})
  const [value, changes] = useState()
  const communicationRef = createRef()
  useEffect(() => {
    if (value && value.data) {
      setUser(value.data)
    }
  }, [value])
  async function getUser() {
    if (User.type === 'patient')
      await apiRequest('get', `/api/profile/${appointment.doc_id}`, changes)
    else await apiRequest('get', `/api/profile/${appointment.user_id}`, changes)
  }
  useEffect(() => {
    getUser()
  }, [])
  async function Start() {
    await apiRequest('post', '/api/start_appointment', fake, {
      session_id: localStorage.getItem('session_id'),
      appointment: appointment.id,
    })
    communicationRef.current.click()
  }
  function fake() {}
  return (
    <Grid
      container
      item
      xs={12}
      style={{ padding: '0px 10px', marginTop: '10px' }}
    >
      <Paper
        style={{ width: '100%', padding: '10px 10px', marginTop: '20px' }}
        elevation={3}
      >
        {user && user.type ? (
          <Grid container item xs={12}>
            <Grid container item xs={12} justify="space-between">
              <Grid container item justify="space-between">
                <Grid
                  container
                  item
                  alignContent="center"
                  alignItems="center"
                  xs={9}
                >
                  <Grid item>
                    <img
                      src={
                        user.user.profile
                          ? user.user.profile
                          : 'https://img.icons8.com/ios/50/000000/administrator-male--v1.png'
                      }
                      style={{
                        height: '40px',
                        width: '40px',
                      }}
                      alt="profile"
                    ></img>
                  </Grid>
                  <Grid item style={{ marginLeft: '20px' }}>
                    <Typography>
                      <Link
                        style={{ textDecoration: 'none' }}
                        to={`info/${user.user.id}`}
                      >
                        {user.user.name}
                      </Link>{' '}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  {!prev ? (
                    appointment.start ? (
                      appointment.timestamp > new Date().getTime() &&
                      new Date().getTime() + 1800000 > appointment.timestamp ? (
                        <Button
                          variant="contained"
                          onClick={Start}
                          style={
                            !appointment.ended
                              ? {
                                  //   marginRight: '150px',
                                  marginTop: '10px',
                                  backgroundColor: '#2bff18',
                                  color: 'white',
                                }
                              : {
                                  //   marginRight: '150px',
                                  marginTop: '10px',
                                  backgroundColor: '#007da37a',
                                  color: 'white',
                                }
                          }
                          disabled={
                            appointment.timestamp > new Date().getTime() &&
                            new Date().getTime() + 1800000 >
                              appointment.timestamp &&
                            !appointment.ended
                              ? false
                              : true
                          }
                        >
                          join
                        </Button>
                      ) : null
                    ) : User && User.type !== 'patient' ? (
                      <Button
                        variant="contained"
                        onClick={Start}
                        style={
                          appointment.timestamp > new Date().getTime() &&
                          new Date().getTime() + 1800000 > appointment.timestamp
                            ? {
                                //   marginRight: '150px',
                                marginTop: '10px',
                                backgroundColor: '#007DA3',
                                color: 'white',
                              }
                            : {
                                //   marginRight: '150px',
                                marginTop: '10px',
                                backgroundColor: '#007da37a',
                                color: 'white',
                              }
                        }
                        disabled={
                          appointment.timestamp > new Date().getTime() &&
                          new Date().getTime() + 1800000 > appointment.timestamp
                            ? false
                            : true
                        }
                      >
                        Start
                      </Button>
                    ) : null
                  ) : null}
                </Grid>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs={12}>
                <Typography>{appointment.Subject}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  {appointment.Description &&
                  appointment.Description.length > 150
                    ? appointment.Description.substring(0, 250) + ' ...'
                    : appointment.Description}
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="flex-end">
              <Typography variant="subtitle1">
                {moment(appointment.StartTime).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )}
              </Typography>
            </Grid>
          </Grid>
        ) : (
          <Grid container item xs={12}>
            <Grid container item xs={12} justify="space-between">
              <Grid container item justify="space-between">
                <Grid
                  container
                  item
                  alignContent="center"
                  alignItems="center"
                  xs={9}
                >
                  <Grid item>
                    <img
                      style={{
                        backgroundColor: '#c3c3c3',
                        borderRadius: '50px',
                        height: '40px',
                        width: '40px',
                      }}
                      alt=""
                    ></img>
                  </Grid>
                  <Grid item style={{ marginLeft: '20px' }}>
                    <div
                      style={{
                        height: '20px',
                        width: '100px',
                        backgroundColor: '#c3c3c3',
                        borderRadius: '10px',
                      }}
                    ></div>
                  </Grid>
                </Grid>
                <Grid item xs={3}>
                  <div
                    style={{
                      height: '30px',
                      width: '100px',
                      marginTop: '20px',
                      backgroundColor: '#e2e2e2',
                      borderRadius: '10px',
                    }}
                  ></div>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item>
              <Grid item xs={12}>
                <div
                  style={{
                    height: '15px',
                    width: '100px',
                    backgroundColor: '#e2e2e2',
                    borderRadius: '10px',
                  }}
                ></div>
              </Grid>

              <Grid item xs={12}>
                <div
                  style={{
                    marginTop: '10px',
                    height: '20px',
                    width: '100%',
                    backgroundColor:
                      'linear-gradient(90deg, rgba(226,226,226,1) 0%, rgba(227,227,227,1) 34%, rgba(195,195,195,1) 100%)',
                    borderRadius: '10px',
                  }}
                ></div>
              </Grid>
            </Grid>
            <Grid container item xs={12} justify="flex-end">
              <div
                style={{
                  marginTop: '10px',
                  height: '20px',
                  width: '80px',
                  backgroundColor:
                    'linear-gradient(90deg, rgba(226,226,226,1) 0%, rgba(227,227,227,1) 34%, rgba(195,195,195,1) 100%)',
                  borderRadius: '10px',
                }}
              ></div>
            </Grid>
          </Grid>
        )}
      </Paper>
      <Link
        to={{
          pathname: `/appointment/${appointment.id}`,
          appointment,
        }}
        style={{ display: 'none' }}
        ref={communicationRef}
      />
    </Grid>
  )
}
