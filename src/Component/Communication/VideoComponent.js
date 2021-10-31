import { Grid } from '@material-ui/core'
import { useEffect, createRef } from 'react'
// import { createRef } from 'react'

export default async function VideoComponent() {
  return (
    <Grid>
      <video id="video-ref" />
    </Grid>
  )
}
