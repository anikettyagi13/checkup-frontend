import { Button, Grid, Typography } from '@material-ui/core'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import theme from '../../Theme'
import Loading from '../../utils/Loading'

export default function LoginMain({
  email,
  setEmail,
  password,
  setPassword,
  LoginClick,
  path,
  buttonClick,
}) {
  const [viewPassword, setViewPassword] = useState(false)
  return (
    <Grid
      container
      item
      xs={10}
      md={8}
      justifyContent="center"
      alignContent="center"
      className="hidden animateBlock"
      spacing={3}
    >
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant="h1" className="h1">
          LOGIN
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          autoFocus
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                src="https://img.icons8.com/material-outlined/24/3a3a3a/mail.png"
                alt="mail"
                style={{ marginRight: '10px' }}
              />
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          fullWidth
          value={password}
          type={!viewPassword ? 'password' : 'text'}
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/3b3b3b/external-password-internet-security-those-icons-lineal-those-icons-6.png"
                alt="password"
                style={{ marginRight: '10px' }}
              />
            ),
            endAdornment: viewPassword ? (
              <img
                src="https://img.icons8.com/material-outlined/24/3b3b3b/visible--v1.png"
                alt="view"
                style={{ marginRight: '10px' }}
                onClick={() => setViewPassword(false)}
              />
            ) : (
              <img
                alt="hidden"
                src="https://img.icons8.com/material-outlined/24/3b3b3b/hide.png"
                style={{ marginRight: '10px' }}
                onClick={() => setViewPassword(true)}
              />
            ),
          }}
        />
      </Grid>
      <Grid container item justifyContent="center">
        <Button
          variant="contained"
          style={{
            backgroundColor: buttonClick
              ? theme.palette.dark.main
              : theme.palette.primary.main,
            color: 'white',
            padding: '10px 50px',
          }}
          onClick={LoginClick}
          disabled={buttonClick}
        >
          {buttonClick ? <Loading width="50" stroke="16" /> : <>Login</>}
        </Button>
      </Grid>
      <Typography style={{ marginTop: '15px' }} className="subtitle1">
        Don't have an account with us?{' '}
        <Link to={`/signup?path=${path}`}>Signup</Link>
      </Typography>
    </Grid>
  )
}
