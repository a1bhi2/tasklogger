import React from 'react';
import { Box, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FilterListIcon from '@mui/icons-material/FilterList';

const TaskFilters = ({ viewMode, setViewMode, selectedDate, onDateChange, filter, setFilter }) => (
  <Box component="section" sx={{ width: '100%', mb: 2 }}>
    <Box display="flex" gap={2} mb={2}>
      <TextField
        label="Date"
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={onDateChange}
        size="small"
        InputLabelProps={{ shrink: true }}
        sx={{ flex: 1 }}
      />
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_, v) => v && setViewMode(v)}
        size="small"
        sx={{ flex: 1 }}
      >
        <ToggleButton value="daily" sx={{ flex: 1 }}><CalendarMonthIcon /> Daily</ToggleButton>
        <ToggleButton value="weekly" sx={{ flex: 1 }}><ListAltIcon /> Weekly</ToggleButton>
      </ToggleButtonGroup>
    </Box>
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <FilterListIcon color="action" />
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, v) => v && setFilter(v)}
        size="small"
        sx={{ ml: 1 }}
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="active">Active</ToggleButton>
        <ToggleButton value="completed">Completed</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  </Box>
);

export default TaskFilters;
