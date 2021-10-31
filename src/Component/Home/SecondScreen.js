import { Button, Grid, Typography } from '@material-ui/core'
import img from '../../assets/calender.svg'
import theme from '../../Theme'
export default function SecondScreen() {
  return (
    <Grid container item xs={12} alignItems="center">
      <Grid
        container
        item
        md={6}
        xs={12}
        justify="center"
        className="animateImage3 hidden"
      >
        <Grid item xs={10} justify="center">
          <img src={img} alt="calender" className="screenImage" />
        </Grid>
      </Grid>
      <Grid
        container
        item
        md={6}
        xs={12}
        justify="center"
        className="animateBlock3 hidden"
      >
        <Grid item xs={8}>
          <Typography className="h3">Schedule Your Appointment</Typography>
          <Typography className="body">
            We provide users the facility to get their illness daignosed with
            the best doctors around the globe overcoming the boundaries of
            countries with just a few clicks.
          </Typography>
          <Button
            style={{
              backgroundColor: theme.palette.green.main,
              padding: '15px',
              //   width: '200px',
              marginTop: '20px',
              color: 'white',
            }}
          >
            Schedule your first
            <br /> appointment
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
