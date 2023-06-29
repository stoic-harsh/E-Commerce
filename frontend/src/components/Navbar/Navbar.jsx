import * as React from 'react';
import {
  AppBar,
  Box, Toolbar, IconButton, Typography,
  Menu, Container, MenuItem, Badge
} from '@mui/material';

import {
  Menu as MenuIcon, ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  HomeSharp as HomeSharpIcon
} from '@mui/icons-material';

import { NavLink, useNavigate } from 'react-router-dom';

const pages = ['Home Page', 'Products Cart'];


const Navbar = ({ cart}) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navigate = useNavigate();
  const navigate_to_page = (page)=>{
    return (page === 'Home Page') ? navigate('/') : navigate('/cart')
  }

  return (
    <AppBar position="sticky" sx={{ height: { xs: 58, sm: 65 } }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', sm: 'flex', alignItems: 'center' } }}
          >
            <img src="./logo.png" alt='logo' style={{ height: '50px', marginRight: '10px' }} />
            <span>React-KART</span>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' }, alignItems: 'center' }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h5" style={{ left: '50%', position: 'absolute', transform: 'translateX(-50%)', whiteSpace: 'nowrap' }}>
              React-KART
            </Typography>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
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
                <MenuItem key={page} onClick={ ()=>{
                  handleCloseNavMenu();
                  navigate_to_page(page);
                }>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <div style={{ flexGrow: 1 }} />

          <IconButton sx={{ color: 'rgb(0,0,0)', display: { xs: 'none', sm: 'flex' } }}>
            <NavLink to='/'><HomeSharpIcon sx={{ color: 'rgb(0,0,0)' }} /></NavLink>
          </IconButton>
          <Badge sx={{ display: { xs: 'none', sm: 'flex' } }} badgeContent={cart.line_items && cart.total_items} color="warning" overlap="circular">
          <IconButton >
            <NavLink to='/cart'><ShoppingCartCheckoutIcon sx={{ color: 'rgb(0,0,0)' }}/></NavLink>
          </IconButton>
          </Badge>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
