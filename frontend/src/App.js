import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme,fade } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Grid from '@material-ui/core/Grid';


import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import Logo from '../src/logo.svg';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';


function App(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
 
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton color="inherit">
          <MailIcon />
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <NotificationsIcon />
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Shirts', 'Jeans'].map((text, index) => (
          <ListItem  button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon fontSize="large" /> : <MailIcon fontSize="large" />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;


  return (
    <BrowserRouter>
        <React.Fragment>
          <CssBaseline />
          <Container fixed>
            <div className={classes.grow}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Grid container>
                  <Grid item xs={1}>
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      fontSize="large"
                      onClick={handleDrawerToggle}
                    >
                      <MenuIcon className={classes.menuButton}/>
                    </IconButton>
                  </Grid>
                  <Grid item xs={8} md={10} className={classes.title}>
                  <Link to='/'>
                    <img src={Logo} alt="logo" className={classes.logo} />
                  </Link>

                  </Grid>
                  <Grid item xs={3} md={1} className={classes.items}>
                    <div className={classes.grow}/>             
                    {!userInfo ? ( 
                      <div>  
                    <Link to={"/cart/:id?"}>
                      <IconButton 
                        edge="end"
                        color="inherit">
                        <ShoppingCartIcon/>                   
                      </IconButton>  
                    </Link>    
                    <Link to={"/signin?/"}>
                      <IconButton 
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit" >
                        <AccountCircle/>
                      </IconButton> 
                    </Link>    
                      </div>             
                    ) : (
                      <div className={classes.sectionMobile}>
                      <Link to={"/cart/:id?"}>
                        <IconButton 
                          edge="end"
                          color="inherit">
                          <ShoppingCartIcon/>                   
                        </IconButton>  
                      </Link>   
                      <IconButton 
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit" >
                        <AccountCircle/>
                      </IconButton>
                      </div>
                    )}

                    {userInfo && userInfo.isAdmin && (
                      <div className="dropdown">
                        <Button href="#" color="inherit" fontSize="large">Admin</Button>
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/orders">Orders</Link>
                            <Link to="/products">Products</Link>
                          </li>
                        </ul>
                      </div>
                    )} 
                  </Grid>
                  </Grid>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            </div>
            <nav className={classes.drawer} aria-label="mailbox folders">
              {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
              <Hidden xsDown implementation="css">
                <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  {drawer}
                </Drawer>
              </Hidden>
            </nav>

            <main className="main">
            <div className={classes.toolbar} />
              <div className="content">
                <Route path="/orders" component={OrdersScreen} />
                <Route path="/profile" component={ProfileScreen} />
                <Route path="/order/:id" component={OrderScreen} />
                <Route path="/products" component={ProductsScreen} />
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/payment" component={PaymentScreen} />
                <Route path="/placeorder" component={PlaceOrderScreen} />
                <Route path="/signin" component={SigninScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen} />
                <Route path="/category/:id" component={HomeScreen} />
                <Route path="/" exact={true} component={HomeScreen} />
                </div>
              </main>

              </Container>
            </React.Fragment>
      

    </BrowserRouter>
  );
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
  },

  menuItems: {
    marginLeft: theme.spacing(2),
    fontSize: 'large',
  },
  
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    color: '#212121'
  },
  title: {
    textAlign: 'center',
    justifyContent: 'center',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
  },
  appBar:{
    backgroundColor: '#f0f0f0'
  },
  items:{
    color:'#212121',
  },
  logo:{
    width: '10rem',
  }

}));



export default App;
