import React from 'react';
import { Paper, Typography, Button, Box, CircularProgress, Alert } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const SummarySection = ({
  viewMode,
  selectedDate,
  displayedTasks,
  geminiApiKey,
  isGeneratingSummary,
  geminiError,
  geminiSummary,
  onGenerateSummary
}) => (
  <Paper elevation={2} sx={{ p: 2, mb: 2, width: '100%' }}>
    <Typography variant="subtitle2" color="text.secondary" fontWeight={600} mb={1} sx={{ letterSpacing: 1, textTransform: 'uppercase' }}>
      {viewMode === 'daily' ? 'Daily Summary' : 'Weekly Summary'}
    </Typography>
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      startIcon={<AutoAwesomeIcon />}
      onClick={onGenerateSummary}
      disabled={isGeneratingSummary || displayedTasks.length === 0 || !geminiApiKey}
      sx={{ mb: 2 }}
    >
      Generate Enhanced Summary
    </Button>
    {isGeneratingSummary && <Box display="flex" justifyContent="center"><CircularProgress size={24} color="secondary" /></Box>}
    {geminiError && <Alert severity="error" sx={{ mt: 1 }}>{geminiError}</Alert>}
    {geminiSummary && !isGeneratingSummary && (
      <Alert severity="success" sx={{ mt: 2, whiteSpace: 'pre-wrap' }}>{geminiSummary}</Alert>
    )}
  </Paper>
);

export default SummarySection;
