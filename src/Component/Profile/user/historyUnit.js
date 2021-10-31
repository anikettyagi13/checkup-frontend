import { Paper, Typography } from '@material-ui/core'
import { Grid } from '@mui/material'
import { useState } from 'react'
import BuildDailog from '../../../utils/BuildDailog'
import PDF_view from '../../../utils/PDF_view'
import { apiRequest } from '../../../utils/utils'
export default function HistoryUtils({ history }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Grid item xs={12} md={6} style={{ padding: '10px' }}>
        <BuildDailog open={open} setOpen={setOpen}>
          <PDF_view url={history.link} name={history.name} />
        </BuildDailog>
        <Paper elevation={2}>
          <Grid container item>
            <Grid
              container
              item
              xs={10}
              style={{ height: '150px' }}
              alignItems="center"
            >
              <Grid item>
                <img
                  src="https://img.icons8.com/color/48/000000/pdf.png"
                  style={{ marginLeft: '30px', borderRadius: '10px' }}
                  alt="history pdf"
                />
              </Grid>
              <Grid item alignContent="center">
                <Grid item>
                  <Typography variant="p">{history.name}</Typography>
                  <Typography variant="subtitle1">{history.info}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={2} alignContent="center" spacing={2}>
              <Grid
                item
                onClick={() => {
                  setOpen(true)
                }}
              >
                <img
                  src="https://img.icons8.com/material-rounded/24/000000/visible.png"
                  alt="view"
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}
