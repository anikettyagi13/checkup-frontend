import { Button, Grid, Typography } from '@material-ui/core'

export default function AcceptCall({ user, setRinging, AcceptButtonClick }) {
  return (
    <Grid container item className="Ringing">
      <Grid item xs={12}>
        <Grid container item xs={12}>
          <Grid container item xs={12} alignItems="center">
            <Grid item>
              <img
                src={user && user.user && user.user.profile}
                style={{
                  height: '40px !important',
                  width: '40px',
                  borderRadius: '25px',
                  // marginLeft: '10px',
                }}
                alt="img"
              ></img>
            </Grid>
            <Typography
              style={{
                textDecoration: 'none',
                color: '#1b3038',
                marginLeft: '10px',
              }}
            >
              {user && user.user && user.user.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{ position: 'absolute', right: '10px', marginTop: '-10px' }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: '#13eb13', color: 'white' }}
            onClick={AcceptButtonClick}
          >
            ACCEPT
          </Button>
          <Button
            onClick={() => {
              setRinging(false)
            }}
          >
            <img
              src="https://img.icons8.com/windows/32/000000/macos-close.png"
              alt="close"
            />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
