import React from 'react'
import PropTypes from 'prop-types'
import { Select, MenuItem, FormControl, InputLabel, Box } from '@material-ui/core'
const SortSelect = ({ setSortType }) => {

  const sortTypes = [
    { label: 'Price (low to high)', value: 'lowPrice' },
    { label: 'Price(high to low)', value: 'highPrice' },
  ]

  const onTypeChange = (e) => {
    setSortType(e.target.value)
  }

  return (
    <Box sx={{ m: 1, width: 300 }}>

      <FormControl fullWidth>
        <InputLabel id='select-label'>Sort by</InputLabel>
        <Select
          labelId='select-label'
          defaultValue=''
          onChange={onTypeChange}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            getContentAnchorEl: null
          }}
        >
          {sortTypes.map((item) => {
            return (<MenuItem
              key={item.label}
              value={item.value}
            >
              {item.label}
            </MenuItem>
            )
          })}
        </Select>
      </FormControl>

    </Box>
  )
}


SortSelect.propTypes = {
  setSortType: PropTypes.func
}

export default SortSelect