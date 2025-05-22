import React from 'react';
import { Typography } from '@mui/material';

const Greeting = ({ greeting }) => (
  <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1, fontWeight: 500, letterSpacing: 1 }}>{greeting}</Typography>
);

export default Greeting;
