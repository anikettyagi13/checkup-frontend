import { Grid, Paper } from '@material-ui/core'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { apiRequest } from '../../../utils/utils'

export default function Availability({ avail, deleteAvailbility }) {
  const [info, setInfo] = useState({})
  const [value, changes] = useState()
  useEffect(() => {
    if (value && value.data) {
      setInfo(value.data)
    }
  }, [value])
  useEffect(() => {
    async function yo() {
      await apiRequest('get', `/api/profile/${avail.doc_id}`, changes)
    }
    yo()
  }, [])

  return (
    <Grid container style={{ marginBottom: '10px' }}>
      <Grid container item xs={12}>
        <Paper>
          <Grid
            container
            item
            xs={12}
            style={{ height: '80px', width: '350px', padding: '20px' }}
            alignContent="center"
            alignItems="center"
          >
            {info.user ? (
              <>
                <Grid container item xs={10} alignItems="center">
                  <Grid item>
                    <img
                      src={info.user.profile}
                      style={{
                        height: '40px !important',
                        width: '40px',
                        borderRadius: '25px',
                      }}
                      alt="img"
                    ></img>
                  </Grid>
                  <Grid item style={{ marginLeft: '20px' }}>
                    <Link
                      to={`/info/${info.user.id}`}
                      style={{ textDecoration: 'none', color: '#1b3038' }}
                    >
                      {info.user.name}
                    </Link>
                  </Grid>
                </Grid>

                <Grid item xs={2}>
                  <img
                    src="https://img.icons8.com/ios-glyphs/24/000000/trash--v1.png"
                    alt="delete"
                    onClick={deleteAvailbility}
                  />
                </Grid>
              </>
            ) : null}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
