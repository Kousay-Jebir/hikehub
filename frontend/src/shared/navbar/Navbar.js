import React, { useState, useContext } from 'react';
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Button,
  TextField,
  Tooltip,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import AuthContext from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const authData = useContext(AuthContext);
  const { isLoggedIn, user } = authData;
  const navigate = useNavigate();
  const settings = ['Profile', 'Account', 'Logout'];
  const pages = isLoggedIn ? ['Feed', 'Recommendations'] : ['Login', 'Signup'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

    if (setting === 'Profile') {
      if (user.roles.includes('organizer')) {
        navigate('/setup/organization-profile');
      } else if (user.roles.includes('hiker')) {
        navigate('/setup/hiker-profile');
      }
    } else if (setting === 'Account') {
      console.log('Account');
    } else if (setting === 'Logout') {
      console.log('Logout');
      // You can also add logout logic here, for example, calling a logout function from your AuthContext
    }
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            HikeHub
          </Typography>

          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              InputProps={{ sx: { bgcolor: 'background.paper' } }}
              sx={{ width: '100%', maxWidth: 400, ml: 2 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {!isLoggedIn ? (
                <>
                  <Button onClick={() => { navigate('/signin'); }} sx={{ mx: 1, color: 'inherit' }}>LOGIN</Button>
                  <Button onClick={() => { navigate('/signup'); }} sx={{ mx: 1, color: 'inherit' }}>SIGNUP</Button>
                </>
              ) : (
                <>
                  {user.roles.includes("organizer") ? (
                    <Button onClick={() => { navigate('/events/new'); }} sx={{ mx: 1, color: 'red' }}>POST EVENT</Button>
                  ) : (
                    <Button onClick={() => { navigate('/'); }} sx={{ mx: 1, color: 'inherit' }}>FEED</Button>
                  )}
                  <Button onClick={() => { navigate('/'); }} sx={{ mx: 1, color: 'inherit' }}>RECOMMENDATIONS</Button>
                </>
              )}
            </Box>

            {isLoggedIn && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={() => handleCloseUserMenu(null)}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <IconButton
            size="large"
            aria-label="open drawer"
            edge="end"
            onClick={handleOpenNavMenu}
            color="inherit"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                {page}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
