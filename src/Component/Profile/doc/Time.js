import * as React from 'react'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles({
  timeline: {
    transform: 'rotate(90deg)',
  },
  timelineContentContainer: {
    textAlign: 'left',
  },
  timelineContent: {
    display: 'inline-block',
    transform: 'rotate(-90deg)',
    textAlign: 'center',
    margin: '0px !important',
    backgroundColor: 'transparent',
    minWidth: 50,
  },
  timelineIcon: {
    transform: 'rotate(-90deg)',
  },
})

export default function Time({ timeline }) {
  const classes = useStyles()
  return (
    <Grid container>
      {timeline.map((time) => {
        return (
          <Timeline position="alternate" className={classes.timeline}>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContentContainer}>
                <Paper className={classes.timelineContent} elevation={0}>
                  <Typography>{time.split('-')[0]}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot variant="outlined" />
                {/* <TimelineConnector /> */}
              </TimelineSeparator>
              <TimelineContent className={classes.timelineContentContainer}>
                <Paper className={classes.timelineContent} elevation={0}>
                  <Typography>{time.split('-')[1]}</Typography>
                </Paper>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        )
      })}
    </Grid>
  )
}
