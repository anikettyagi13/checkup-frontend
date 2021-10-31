import { Grid } from '@material-ui/core'
import { useEffect } from 'react'
import { animateBlock, animateBlock2 } from './Animations'
import FirstScreen from './FirstScreen'
import './Home.css'
import SecondScreen from './SecondScreen'
import ThirdScreen from './ThirdScreen'
export default function Home() {
  useEffect(() => {
    animateBlock2()
    animateBlock()
  }, [])
  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        style={{ minHeight: '100vh', width: '100vw' }}
      >
        <FirstScreen />
      </Grid>
      <Grid container item xs={12} className="screen">
        <SecondScreen />
      </Grid>
      <Grid container item xs={12} className="screen">
        <ThirdScreen />
      </Grid>
    </Grid>
  )
}
