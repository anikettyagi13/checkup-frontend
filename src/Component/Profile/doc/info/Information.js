import { Grid, Typography } from '@material-ui/core'
import InfoMain from './InfoMain'
import TimeLineBlock from './TimeLineBlock'

export default function Information({
  hospital,
  setHospital,
  fees,
  setFees,
  treatment,
  setTreatment,
  days,
  setDays,
  timeing,
  setTimeing,
  type,
}) {
  return (
    <Grid
      container
      item
      xs={12}
      justify="space-between"
      align-items="center"
      style={{ marginTop: '20px' }}
    >
      <InfoMain
        hospital={hospital}
        setHospital={setHospital}
        fees={fees}
        setFees={setFees}
        treatment={treatment}
        setTreatment={setTreatment}
        type={type}
      />
      <TimeLineBlock
        days={days}
        setDays={setDays}
        timeing={timeing}
        setTimeing={setTimeing}
        type={type}
      />
    </Grid>
  )
}
