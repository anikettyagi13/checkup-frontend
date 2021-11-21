import { Button, Grid, Typography } from '@material-ui/core'
import { createRef } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/add_history.svg'
import theme from '../../Theme'

export default function ThirdScreen() {
  const ProfileRef = createRef(null)
  return (
    <Grid container item xs={12} alignItems="center">
      <Grid container item md={6} xs={12} justify="center">
        <Grid item xs={8} className="hideWhenSmall hidden animateBlock2">
          <Typography className="h3">Add Medical History</Typography>
          <Typography className="body">
            We provide an easy way to save your history which can be accessed by
            the doctors to help curing the illness faster!
          </Typography>
          <Button
            style={{
              backgroundColor: theme.palette.secondary.main,
              padding: '15px',
              //   width: '200px',
              color: 'white',
              marginTop: '20px',
            }}
          >
            Build Your Profile
          </Button>
        </Grid>
        <Grid
          item
          xs={10}
          justify="center"
          className="showWhenSmall hidden animateImage2"
        >
          <img src={img} alt="calender" className="screenImage" />
        </Grid>
      </Grid>
      <Grid container item md={6} xs={12} justify="center">
        <Grid
          item
          xs={10}
          justify="center"
          className="hideWhenSmall hidden animateImage2"
        >
          <img src={img} alt="calender" className="screenImage" />
        </Grid>
        <Grid item xs={8} className="showWhenSmall hidden animateBlock2">
          <Typography className="h3">Add Medical History</Typography>
          <Typography className="body">
            We provide an easy way to save your history which can be accessed by
            the doctors to help curing the illness faster!
          </Typography>
          <Button
            style={{
              backgroundColor: theme.palette.secondary.main,
              padding: '15px',
              marginTop: '20px',

              //   width: '200px',
              color: 'white',
            }}
            onClick={() => {
              ProfileRef.current.click()
            }}
          >
            Build Your Profile
          </Button>
        </Grid>
      </Grid>
      <Link to={'/profile'} style={{ display: 'none' }} ref={ProfileRef} />
    </Grid>
  )
}
