import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Slide from '@mui/material/Slide'
import { TextField } from '@mui/material'
import { Grid } from '@material-ui/core'
import SearchHistory from './SearchHistory'
import { apiRequest } from '../../utils/utils'
import SearchResults from './SearchResults'
import { useState } from 'react'
import Loading from '../../utils/Loading'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function SearchDailog({ open, setOpen }) {
  const [search, setSearch] = React.useState('')
  const [searchResult, setSearchResult] = React.useState()
  const [loading, setLoading] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  async function searchNow(searchstring) {
    let s = typeof searchstring !== 'object' ? searchstring : search
    console.log(s)

    if (s === '') {
      return
    }
    setLoading(true)
    await apiRequest('post', '/api/search', changes, {
      session_id: localStorage.getItem('session_id'),
      search: s,
    })
  }
  function changes(data) {
    if (data && data.data) {
      console.log(data.data.result)
      setSearchResult(data.data.result)
    }
    setLoading(false)
  }
  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }} elevation={0}>
          <Toolbar style={{ backgroundColor: '#fff' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <img
                src="https://img.icons8.com/external-those-icons-fill-those-icons/18/1F4F6B/external-down-arrows-those-icons-fill-those-icons-7.png"
                alt="down"
              />
            </IconButton>
            <Grid container justify="center">
              <Grid item xs={10} md={6}>
                <TextField
                  fullWidth
                  variant="standard"
                  autoFocus
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                  }}
                  InputProps={{
                    endAdornment: (
                      <img
                        src="https://img.icons8.com/material-outlined/24/5FA8D3/search--v1.png"
                        alt="search"
                        onClick={searchNow}
                      />
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {loading ? (
          <Grid
            style={{
              width: '100vw',
              height: '100vh',
              // backgroundColor: '#1F4F6B',
            }}
          >
            <Loading width="300" />
          </Grid>
        ) : (
          <>
            {searchResult ? (
              <Grid container justify="center">
                <Grid item xs={10} md={6}>
                  <SearchResults
                    searchResults={searchResult}
                    setOpen={setOpen}
                    searchText={search}
                    setSearchText={setSearch}
                    searchNow={searchNow}
                  />
                </Grid>
              </Grid>
            ) : (
              <SearchHistory
                search={search}
                setSearch={setSearch}
                loading={loading}
                setLoading={setLoading}
                searchNow={searchNow}
              />
            )}
          </>
        )}
      </Dialog>
    </div>
  )
}
