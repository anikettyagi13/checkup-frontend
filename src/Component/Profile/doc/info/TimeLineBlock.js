import { Typography } from '@material-ui/core'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import theme from '../../../../Theme'
import Time from '../Time'
export default function TimeLineBlock({
  days,
  setDays,
  timeing,
  setTimeing,
  type,
}) {
  const k = '9am-10pm,10pm-12pm'.split(',')
  return (
    <Grid
      item
      container
      sm={5}
      xs={12}
      className="timelineBlock"
      // style={{ backgroundColor: theme.palette.yellow.main }}
    >
      <Grid item xs={12} className="center">
        <Typography className="h3">Availability</Typography>
        {type === 'edit' ? (
          <TextField
            variant="filled"
            label="DAYS"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        ) : (
          <Typography className="body">Days -> {days}</Typography>
        )}
        {type === 'edit' ? (
          <>
            <TextField
              variant="filled"
              label="Available Time"
              margin="normal"
              fullWidth
              value={timeing}
              onChange={(e) => setTimeing(e.target.value)}
            />
            <Typography className="subtitle1">
              Comma seprated if multiple times are available for eg: 11AM-12AM,
              5PM-6PM
            </Typography>
          </>
        ) : (
          <Typography className="body">Time-: {timeing}</Typography>
        )}
      </Grid>
    </Grid>
  )
}
