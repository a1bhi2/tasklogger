import React, { useRef } from 'react';
import { Paper, TextField, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const TaskInput = ({ value, onChange, onAdd }) => {
  const inputRef = useRef();
  return (
    <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
      <form onSubmit={onAdd}>
        <TextField
          label="Add New Task"
          inputRef={inputRef}
          name="taskInput"
          value={value}
          onChange={onChange}
          fullWidth
          size="small"
          sx={{ mb: 2 }}
        />
        {/* Optionally, you can add a button here if you want a visible submit button */}
      </form>
    </Paper>
  );
};

export default TaskInput;
