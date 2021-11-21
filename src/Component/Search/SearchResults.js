import { Chip, Grid, List, ListItem, Typography } from '@material-ui/core'
import SearchResultUtils from './SearchResultUtils'

export default function SearchResults({
  searchResults,
  setOpen,
  searchText,
  setSearchText,
  searchNow,
}) {
  return (
    <Grid container item xs={12}>
      {searchResults.map((result) => {
        return (
          <SearchResultUtils
            result={result}
            setOpen={setOpen}
            searchText={searchText}
            setSearchText={setSearchText}
            searchNow={searchNow}
          />
        )
      })}
    </Grid>
  )
}
