import React from 'react';
import { Typography } from '@mui/material';

const Greeting = () => {
  const hour = new Date().getHours();
  let greet = 'Hello';
  if (hour < 12) greet = 'Good morning';
  else if (hour < 18) greet = 'Good afternoon';
  else greet = 'Good evening';
  return (
    <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1, fontWeight: 500, letterSpacing: 1 }}>{greet}, Abhishek!</Typography>
  );
};

export default Greeting;
