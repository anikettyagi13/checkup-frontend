import { Button, Grid, Typography } from '@material-ui/core'
import { createRef } from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/videocall.svg'
import theme from '../../Theme'

export default function ForthScreen() {
  const AppointmentRef = createRef(null)
  return (
    <Grid
      container
      item
      xs={12}
      justify="center"
      className="screen"
      alignItems="center"
      alignContent="center"
      style={{ marginTop: '100px', marginBottom: '100px' }}
    >
      <Grid
        item
        xs={12}
        justify="center"
        alignItems="center"
        className="animateImage hidden"
      >
        <img
          src={img}
          alt="videocall"
          className="doctor_checking"
          style={{ opacity: '0.4' }}
        />
      </Grid>
      <Grid item xs={10} md={8} className="CheckupText animateBlock hidden">
        <Typography className="h1">Connect virtually!</Typography>
        <Typography className="body">
          Check up provides a low latency built in video calling facility, for
          better connecting with the required medical professional from all
          around the world.
        </Typography>
        <Button
          style={{
            backgroundColor: theme.palette.red.main,
            color: 'white',
            padding: '15px',
            borderRadius: '100px',
            marginTop: '30px',
          }}
          onClick={() => {
            AppointmentRef.current.click()
          }}
        >
          Schedule Your Appointment
        </Button>
      </Grid>
      <Link
        to={'/appointment'}
        style={{ display: 'none' }}
        ref={AppointmentRef}
      />
    </Grid>
  )
}
