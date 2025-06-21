import React from 'react';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem,
  Box
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BookFilter = ({ 
  authorValue, 
  availabilityValue, 
  onAuthorChange, 
  onAvailabilityChange 
}) => (
  <Box display="flex" gap={2} mb={3} flexWrap="wrap">
    <TextField
      label="Search books or authors"
      variant="outlined"
      value={authorValue}
      onChange={(e) => onAuthorChange(e.target.value)}
      sx={{ minWidth: 250, flexGrow: 1 }}
      InputProps={{
        startAdornment: (
          <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
        ),
      }}
    />
    
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel>Availability</InputLabel>
      <Select
        value={availabilityValue}
        onChange={(e) => onAvailabilityChange(e.target.value)}
        label="Availability"
      >
        <MenuItem value="all">All Books</MenuItem>
        <MenuItem value="available">Available Only</MenuItem>
        <MenuItem value="rented">Rented Only</MenuItem>
      </Select>
    </FormControl>
  </Box>
);

export default BookFilter;