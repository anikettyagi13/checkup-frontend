import { Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { animateBlock, animateBlock2 } from './Animations'
import FirstScreen from './FirstScreen'
import ForthScreen from './ForthScreen'
import './Home.css'
import SecondScreen from './SecondScreen'
import ThirdScreen from './ThirdScreen'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { useState } from 'react'
import theme from '../../Theme'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export default function Home({ user }) {
  const [open, setOpen] = useState(false)
  const [info, setInfo] = useState('')
  function handleClose() {
    setOpen(false)
  }
  useEffect(() => {
    animateBlock2()
    animateBlock()
  }, [])
  return (
    <Grid container>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="info"
          style={{ backgroundColor: theme.palette.dark.main }}
        >
          {info}
        </Alert>
      </Snackbar>
      <Grid
        container
        item
        xs={12}
        style={{ minHeight: '100vh', width: '100vw' }}
      >
        <FirstScreen setInfo={setInfo} setOpen={setOpen} user={user} />
      </Grid>
      <Grid container item xs={12} className="screen">
        <SecondScreen />
      </Grid>
      <Grid
        container
        item
        xs={12}
        className="screen"
        style={{ marginTop: '100px' }}
      >
        <ThirdScreen />
      </Grid>
      <Grid container item xs={12}>
        <ForthScreen />
      </Grid>
    </Grid>
  )
}
