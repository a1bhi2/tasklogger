import React from 'react';
import { Box, Typography, IconButton, Tooltip, Menu, MenuItem } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Header = ({ themeMode, setThemeMode, onExport, menuAnchor, onOpenMenu, onCloseMenu, onShowApiKey, onAbout }) => (
  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width="100%" mb={2}>
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="h5" color="primary" fontWeight={700} gutterBottom>Daily Task Logger</Typography>
      <Tooltip title={themeMode === 'light' ? 'Dark mode' : 'Light mode'}>
        <IconButton size="small" onClick={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')} sx={{ ml: 1 }}>
          {themeMode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Tooltip>
    </Box>
    <Box>
      <IconButton size="small" color="primary" onClick={onExport} sx={{ mr: 1 }}>
        <FileCopyIcon />
      </IconButton>
      <IconButton size="small" color="primary" onClick={onOpenMenu}>
        <HelpOutlineIcon />
      </IconButton>
      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={onCloseMenu}>
        <MenuItem onClick={onShowApiKey}><SettingsIcon fontSize="small" sx={{ mr: 1 }}/>API Key</MenuItem>
        <MenuItem onClick={onAbout}><InfoOutlinedIcon fontSize="small" sx={{ mr: 1 }}/>About</MenuItem>
      </Menu>
    </Box>
  </Box>
);

export default Header;
