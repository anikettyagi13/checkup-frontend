import { Grid, Paper, Typography } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { apiRequest } from '../../utils/utils'
import image from '../../assets/empty.svg'
import moment from 'moment'

export default function SearchHistory({
  search,
  setSearch,
  searchNow,
  setLoading,
}) {
  const [searchHistory, setSearchHistory] = useState()
  async function getSearchHistory() {
    await apiRequest('post', '/api/getSearchHistory', changes, {
      session_id: localStorage.getItem('session_id'),
    })
  }
  useEffect(() => {
    setLoading(true)
    getSearchHistory()
    setLoading(false)
  }, [])
  function changes(value) {
    if (value && value.data) {
      setSearchHistory(value.data.history)
    }
  }
  return (
    <Grid container justify="center">
      {searchHistory && searchHistory.length > 0 ? (
        <Grid container item xs={10} md={8}>
          {searchHistory.map((history) => {
            return (
              <Grid
                container
                item
                onClick={() => {
                  setSearch(history.searchstring)
                  searchNow(history.searchstring)
                }}
                xs={12}
                alignContent="center"
                style={{
                  height: '50px',
                  border: '1px solid #cccccc',
                  margin: '10px',
                  borderRadius: '7px',
                  position: 'relative',
                }}
                spacing={2}
              >
                <Grid item>
                  <img
                    src="https://img.icons8.com/material-outlined/24/000000/clock--v1.png"
                    alt="past"
                  />
                </Grid>
                <Grid item style={{ marginLeft: '20px' }}>
                  <Typography className="body">
                    {history.searchstring}
                  </Typography>
                </Grid>
                {console.log(history.timestamp)}
                <Grid
                  item={12}
                  style={{ position: 'absolute', right: '0px', bottom: '0px' }}
                >
                  <Typography className="subtitle1">
                    {moment(Number(history.timestamp)).format('MMMM Do YYYY')}
                  </Typography>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
      ) : (
        <Grid
          container
          justify="center"
          alignContent="center"
          alignItems="center"
          style={{ margin: 'auto' }}
        >
          <img
            src={image}
            alt="not found"
            style={{ width: '30%', margin: 'auto', opacity: '0.4' }}
          />
          <Typography
            style={{
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
            }}
            className="h3"
          >
            Search History Not Found{' '}
            <img
              src="https://img.icons8.com/ios-glyphs/30/1F4F6B/sad.png"
              alt="sad"
            />
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
