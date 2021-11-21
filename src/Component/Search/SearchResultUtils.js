import { Chip, Grid, Paper, Typography } from '@material-ui/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import theme from '../../Theme'

export default function SearchResultUtils({
  result,
  setOpen,
  searchText,
  setSearchText,
  searchNow,
}) {
  const [more, setMore] = useState(true)
  return (
    <Paper style={{ width: '100%', padding: '20px' }}>
      <Grid container item xs={12} justify="space-between">
        <Grid container item xs={12}>
          <Grid container xs={10} alignItem="center" alignContent="center">
            <img
              src={
                result.profile
                  ? result.profile
                  : 'https://img.icons8.com/ios/50/000000/administrator-male--v1.png'
              }
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '30px',
              }}
              alt="profile"
            />
            <Typography
              className="body"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <Link
                to={`/info/${result.id}`}
                style={{
                  textDecoration: 'none',
                  color: theme.palette.dark.main,
                }}
                onClick={() => {
                  setOpen(false)
                }}
              >
                {result.name}
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={2} justify="flex-end">
            <Link to={`/info/${result.id}`}>
              <img
                src="https://img.icons8.com/fluency-systems-filled/18/000000/visible.png"
                alt="view"
                onClick={() => {
                  setOpen(false)
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '13px',
                }}
              />
            </Link>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginLeft: '40px' }}>
          <Typography className="subtitle1">
            Hospital/Clinic-: {result.hospital}
          </Typography>
          <Typography className="subtitle1">Fees-: {result.fees}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className="subtitle1"
            style={{ marginTop: '5px', marginLeft: '40px' }}
          >
            {result.bio && result.bio.length > 150 && more ? (
              <>
                {result.bio.substring(0, 150) + ' '}
                <div style={{ display: 'inline' }}>
                  {more ? (
                    <Typography
                      style={{
                        color: theme.palette.primary.main,
                        display: 'inline-flex',
                        alignContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={() => setMore(false)}
                      className="subtitle1"
                    >
                      {/* <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/10/5fa8d3/external-right-arrow-arrows-dreamstale-lineal-dreamstale-2.png" /> */}{' '}
                      more
                      {/* <img src="https://img.icons8.com/small/10/000000/forward.png" /> */}
                      {/* <img src="https://img.icons8.com/external-prettycons-solid-prettycons/10/000000/external-right-arrow-orientation-prettycons-solid-prettycons-2.png" /> */}
                      {/* <img src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/14/5fa8d3/external-right-arrow-arrows-vitaliy-gorbachev-lineal-vitaly-gorbachev-1.png" /> */}
                      <img src="https://img.icons8.com/ios-glyphs/14/5fa8d3/long-arrow-right.png" />
                    </Typography>
                  ) : null}
                </div>
              </>
            ) : (
              result.bio
            )}
          </Typography>
        </Grid>
        <Grid style={{ marginTop: '10px' }}>
          <Chip
            label={result.treatment1}
            onClick={() => {
              setSearchText(result.treatment1)
              searchNow(result.treatment1)
            }}
            style={{
              backgroundColor:
                searchText === result.treatment1
                  ? theme.palette.dark.main
                  : theme.palette.primary.main,
              color: '#fff',
              padding: '1px 6px',
              margin: '5px',
            }}
          />
          <Chip
            label={result.treatment2}
            onClick={() => {
              setSearchText(result.treatment2)
              searchNow(result.treatment2)
            }}
            style={{
              backgroundColor:
                searchText === result.treatment2
                  ? theme.palette.dark.main
                  : theme.palette.primary.main,
              padding: '1px 6px ',
              margin: '5px',
              color: '#fff',
            }}
          />
          <Chip
            label={result.treatment3}
            onClick={() => {
              setSearchText(result.treatment3)
              searchNow(result.treatment3)
            }}
            style={{
              backgroundColor:
                searchText === result.treatment3
                  ? theme.palette.dark.main
                  : theme.palette.primary.main,
              padding: '1px 6px ',
              margin: '5px',
              color: '#fff',
            }}
          />
          <Chip
            label={result.treatment4}
            onClick={() => {
              setSearchText(result.treatment4)
              searchNow(result.treatment4)
            }}
            style={{
              backgroundColor:
                searchText === result.treatment4
                  ? theme.palette.dark.main
                  : theme.palette.primary.main,
              padding: '1px 6px',
              margin: '5px',
              color: '#fff',
            }}
          />
        </Grid>
      </Grid>
    </Paper>
  )
}
