import { Button, Grid, Paper, Typography } from '@material-ui/core'
import { useEffect } from 'react'
import { useState } from 'react'
import theme from '../../../Theme'
import BuildDailog from '../../../utils/BuildDailog'
import { apiRequest } from '../../../utils/utils'
import Availability from './Availability'
import HistoryUtils from './historyUnit'
import image from '../../../assets/nada.svg'

export default function History({ user, newHistory }) {
  const doc_id = localStorage.getItem('session_id')
    ? localStorage.getItem('session_id').split('!id@')[0]
    : null
  const [showAvailability, setShowAvailability] = useState(false)
  const [history, setHistory] = useState([])
  const [availability, setAvailability] = useState([])
  const [value2, changes2] = useState()
  const [value, changes] = useState()
  useEffect(() => {
    if (value && value.data) {
      setHistory(value.data)
    }
  }, [value])
  useEffect(() => {
    if (value2 && value2.data) {
      setAvailability(value2.data)
    }
  }, [value2])
  useEffect(() => {
    try {
      const body = {
        doc_id: doc_id,
        user_id: user.user.id,
      }
      async function yo() {
        await apiRequest('post', '/api/history', changes, body)
        if (doc_id === user.user.id)
          await apiRequest('post', '/api/get_availability', changes2, {
            session_id: localStorage.getItem('session_id'),
          })
      }
      yo()
    } catch (e) {
      console.error('NOT LOGGED IN')
    }
  }, [])
  function deleted(i) {
    const k = [...availability]
    k.splice(i, 1)
    setAvailability(k)
  }
  async function deleteAvailbility(i) {
    await apiRequest('post', `/api/delete_availability`, () => deleted(i), {
      avail: availability[i],
      session_id: localStorage.getItem('session_id'),
    })
  }
  useEffect(() => {
    if (newHistory.length > 0) {
      const k = [...history]
      k.unshift(newHistory[0])
      setHistory(k)
    }
  }, [newHistory])
  return (
    <Grid container item xs={12}>
      <Grid item style={{ marginRight: '30px' }}>
        <Typography
          variant="h4"
          style={{ margin: 'auto', fontSize: '24px', marginLeft: '30px' }}
        >
          History
        </Typography>
      </Grid>
      <Grid>
        {doc_id === user.user.id ? (
          <Button
            variant="contained"
            style={{ backgroundColor: theme.palette.dark.main, color: 'white' }}
            onClick={() => setShowAvailability(!showAvailability)}
          >
            AVAILABLility
          </Button>
        ) : null}
      </Grid>
      <BuildDailog
        open={showAvailability}
        setOpen={setShowAvailability}
        title="Availability"
      >
        {availability.length === 0 ? (
          <img
            src={image}
            style={{
              width: '50%',
              margin: 'auto',
              opacity: '0.7',
              display: 'flex',
              justifyContent: 'center',
            }}
            alt="nothing"
          />
        ) : (
          availability.map((avail, i) => {
            return (
              <Availability
                key={i}
                avail={avail}
                deleteAvailbility={() => deleteAvailbility(i)}
              />
            )
          })
        )}
      </BuildDailog>
      <Grid container item xs={12} style={{ padding: '10px' }}>
        {history.map((h) => {
          return <HistoryUtils key={h.link} history={h} />
        })}
      </Grid>
    </Grid>
  )
}
