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
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AuthContext from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Search from '../search-engine/Search';
import NotificationPopover from '../../notification-management/NotificationPopover';
import { useNotifications } from '../../notification-management/NotificationContext';
export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);
  const authData = useContext(AuthContext);
  const { isLoggedIn, user } = authData;
  const notifications = useNotifications().notifications;
  const unreadCount = notifications.length
  const navigate = useNavigate();
  const settings = ['Profile', 'Account', 'Logout'];
  const pages = isLoggedIn ? ['Feed', 'Recommendations'] : ['Login', 'Signup'];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
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
      if (user.roles.includes('organizer')) {
        navigate('/organizer/account');
      } else if (user.roles.includes('hiker')) {
        navigate('/hiker/account');
      }
    } else if (setting === 'Logout') {
      authData.logout();
      navigate('/');
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

          {/* Search Component */}
          <Search />

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
                    <Button onClick={() => { navigate('/events/participations'); }} sx={{ mx: 1, color: 'inherit' }}>PARTICIPATIONS</Button>
                  )}
                </>
              )}
            </Box>

            {isLoggedIn && user.roles.includes('organizer') && (
              <>
                <IconButton
                  size="large"
                  aria-label="show notifications"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNotifications}
                  color="inherit"
                  sx={{ ml: 1 }}
                >
                  <Badge badgeContent={unreadCount} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <NotificationPopover
                  anchorEl={anchorElNotifications}
                  handleClose={() => setAnchorElNotifications(null)}
                />
              </>
            )}

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
            sx={{ display: { xs: 'block', md: 'none' } }}
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
