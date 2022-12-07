import React from 'react'
import PropTypes from 'prop-types'
import { FormControl, InputLabel, Box, Input } from '@material-ui/core'
const SearchBar = ({ setSearchText }) => {

  const onInputChange = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <Box sx={{ m: 1, width: 300 }}>

      <FormControl fullWidth>
        <InputLabel htmlFor='search'>Search</InputLabel>
        <Input
          id='search'
          type='search'
          onChange={onInputChange}
        >
        </Input>
      </FormControl>

    </Box>
  )
}


SearchBar.propTypes = {
  setSearchText: PropTypes.func
}

export default SearchBar