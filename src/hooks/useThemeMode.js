import { useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const useThemeMode = () => {
  const [themeMode, setThemeMode] = useState('light');
  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode,
      primary: { main: themeMode === 'light' ? '#1976d2' : '#90caf9' },
      background: { default: themeMode === 'light' ? '#f5f5f5' : '#121212' },
    },
    components: {
      MuiButton: { styleOverrides: { root: { transition: 'all 0.2s cubic-bezier(.4,2,.6,1)', boxShadow: 'none' } } },
      MuiIconButton: { styleOverrides: { root: { transition: 'all 0.2s cubic-bezier(.4,2,.6,1)', borderRadius: 12 } } },
      MuiPaper: { styleOverrides: { root: { transition: 'box-shadow 0.2s' } } },
    },
  }), [themeMode]);
  return { theme, themeMode, setThemeMode };
};

export default useThemeMode;
