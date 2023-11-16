import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const options = ["none", "price", "date"];

export default function SortingFilter({sortBy,handleSortByChange}) {
  return (
    <div className='sorting-filter-container'>
      <h2 className='title'>Sort By : </h2>
      <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{width:"250px"}}>
        <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
        <Select
          labelId="sorting-label"
          id="demo-simple-select"
          value={sortBy}
          label="Sort By"
          onChange={handleSortByChange}
        >
          {
            options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option && option[0].toUpperCase() + option.slice(1)}                                    {  /*  put this is bracket if not working ---- option && option[0].toUpperCase() + option.slice(1)  */}
                </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
    </div>
  )
}
