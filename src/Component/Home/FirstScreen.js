import { Button, Grid, Typography } from '@material-ui/core'
import { createRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import img from '../../assets/doctor_checking.svg'
import theme from '../../Theme'
import { animateBlock } from './Animations'

export default function FirstScreen({ user, setInfo, setOpen }) {
  const SignUpRef = createRef(null)
  const [openInfo, setOpenInfo] = useState(false)

  return (
    <Grid
      container
      item
      xs={12}
      justify="center"
      className="screen"
      alignItems="center"
      alignContent="center"
    >
      <Grid
        item
        xs={12}
        justify="center"
        alignItems="center"
        className="animateImage hidden"
      >
        <img src={img} alt="doctor_checking" className="doctor_checking" />
      </Grid>
      <Grid item xs={10} md={8} className="CheckupText animateBlock hidden">
        <Typography className="h1">Check UP</Typography>
        <Typography className="body">
          Check up is an applications that allow doctors and patients connect to
          each other from any part of the world. Our mission is that no one is
          left behind, and everyone gets the best care that they deserve.
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
            if (!(user && user.user && user.user.type))
              SignUpRef.current.click()
            else {
              setInfo('User Already Logged In!')
              setOpen(true)
            }
          }}
        >
          Create your Account
        </Button>
      </Grid>
      <Link to={'/signup?path=/'} style={{ display: 'none' }} ref={SignUpRef} />
    </Grid>
  )
}
