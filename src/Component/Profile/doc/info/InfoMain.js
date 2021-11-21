import { Grid, Typography } from '@material-ui/core'
import TextField from '@mui/material/TextField'
// import { useState } from 'react'
export default function InfoMain({
  hospital,
  setHospital,
  fees,
  setFees,
  treatment,
  setTreatment,
  type,
}) {
  return (
    <Grid
      container
      justify="center"
      // alignContent="center"
      alignItems="center"
      item
      xs={11}
      sm={5}
      className="profileBlock"
      // style={{ backgroundColor: 'pink' }}
    >
      <Grid item xs={12} className="center">
        <Typography className="h3">Information</Typography>
        {type === 'edit' ? (
          <TextField
            label="hospital/clinic"
            variant="filled"
            fullWidth
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          />
        ) : (
          <Typography className="body">Hospital/Clinic-: {hospital}</Typography>
        )}
        {type === 'edit' ? (
          <Grid item xs={12}>
            <TextField
              label="Fees"
              variant="filled"
              margin="normal"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              // fullWidth
            />
          </Grid>
        ) : (
          <Typography className="body">Fees-: {fees}</Typography>
        )}
        {type === 'edit' ? null : (
          <Typography className="body">Patients Treated -: {}</Typography>
        )}
        {type === 'edit' ? (
          <>
            <TextField
              label="Treatment"
              variant="filled"
              fullWidth
              value={treatment}
              onChange={(e) => setTreatment(e.target.value)}
            />
            <Typography className="subtitle1">
              Comma seprated Treatments 5 allowed
            </Typography>
          </>
        ) : (
          <Typography className="body">Treatment: {treatment}</Typography>
        )}
      </Grid>
    </Grid>
  )
}
