import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
} from '@material-ui/core'
import { FormGroup, TextField } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import theme from '../../Theme'
import Loading from '../../utils/Loading'

export default function SignUpMain({
  name,
  email,
  setName,
  setPassword,
  setEmail,
  password,
  accountType,
  setAccountType,
  SignUpClick,
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
      className="animateBlock hidden"
      spacing={3}
    >
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography className="h1" style={theme.typography.h1}>
          SIGNUP
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="standard"
          fullWidth
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{
            startAdornment: (
              <img
                src="https://img.icons8.com/material-outlined/24/3a3a3a/name.png"
                alt="name"
                style={{ marginRight: '10px' }}
              />
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Email"
          variant="standard"
          fullWidth
          value={email}
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
          variant="standard"
          fullWidth
          value={password}
          type={!viewPassword ? 'password' : 'text'}
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
      {/* <Grid item xs={12} display={{ textAlign: 'center' }}> */}
      <FormGroup
        style={{ marginTop: '15px', textAlign: 'center' }}
        className="subtitle1"
      >
        <FormControlLabel
          className="subtitle1"
          control={
            <Checkbox
              value={accountType}
              onClick={() => {
                setAccountType(!accountType)
              }}
            />
          }
          label={
            <Typography className="subtitle1">Are you a Doctor?</Typography>
          }
        />
      </FormGroup>
      {/* </Grid> */}

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
          onClick={SignUpClick}
          disabled={buttonClick}
        >
          {buttonClick ? <Loading width="50" stroke="16" /> : <>SignUp</>}
        </Button>
      </Grid>
      <Typography style={{ marginTop: '15px' }} className="subtitle1">
        Already have an account? <Link to={`/login?path=${path}`}>Login</Link>
      </Typography>
    </Grid>
  )
}
