import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Dashboard from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Badge from '@mui/material/Badge';
import CollectionsIcon from '@mui/icons-material/Collections';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import OrderTable from '../OrderTable/OrderTable';
import UserTable from '../UserTable/UserTable';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function AdminNavbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [activeComponent, setActiveComponent] = React.useState('dashboard');
  const [row, setRow] = React.useState(null);
  const [title, setTite] = React.useState('Welcome to Admin Dashboard');
  const navigate = useNavigate();

 const handleLogout = () => {
    logout();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboard = () => {
    setActiveComponent('dashboard');
    setTite('Welcome to Admin Dashboard');
  };

  const lecher = () => {
    setActiveComponent('lecher');
    setTite('Lecturers Table ');
  };

  const timetable = () => {
    setActiveComponent('timetable');

  };

  const gallery = () => {
    setActiveComponent('gallery');
    setTite('Gallery');
  };

  const staff = () => {
    setActiveComponent('staff');
    setTite('Staff Details');
  };

  const timeTable = () => {
    setActiveComponent('timeTable');
    setTite('TimeTables ');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className='text-bg-secondary'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" className='w-100'>
            <div className="text-center w-100" >
              <h2 >{title}    </h2>
           
            </div>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader>
          <Typography className='mx-5 w-100'
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'block', sm: 'block' } }}
            >
            SASIP
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{ width: '100%', maxWidth: 230, bgcolor: 'background.paper',  }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<ListSubheader component="div" id="nested-list-subheader"></ListSubheader>}
        >
          <br />
          <ListItemButton className='active' onClick={dashboard}>
            <ListItemIcon>
              <Dashboard sx={activeComponent === 'dashboard' ? { color: "#f68714"} : {}} />
            </ListItemIcon>
            <ListItemText primary={<span >Dashboard</span>} sx={activeComponent === 'dashboard' ? { color: "#f68714"} : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={lecher}>
            <ListItemIcon>
              <ManageAccountsIcon sx={activeComponent === 'lecher' ? { color: "#f68714"} : {}} />
            </ListItemIcon>
            <ListItemText primary={<span >Lecturers</span>} sx={activeComponent === 'lecher' ? { color: "#f68714"} : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={timeTable}>
            <ListItemIcon>
              <EventNoteIcon sx={activeComponent === 'timeTable' ? { color: "#f68714"} : {}} />
            </ListItemIcon>
            <ListItemText primary={<span >Time Table</span>} sx={activeComponent === 'timeTable' ? { color: "#f68714"} : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={staff}>
            <ListItemIcon>
              <Badge badgeContent={row} color="success">
                <PeopleOutlineIcon sx={activeComponent === 'staff' ? { color: "#f68714"} : {}} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={<span >Staff Details</span>} sx={activeComponent === 'staff' ? { color: "#f68714"} : {}} />
          </ListItemButton>
          <br /><br />
          <ListItemButton onClick={gallery}>
            <ListItemIcon>
              <Badge >
                <CollectionsIcon sx={activeComponent === 'gallery' ? { color: "#f68714"} : {}} />
              </Badge>
            </ListItemIcon>
            <ListItemText primary={<span >Gallery</span>} sx={activeComponent === 'gallery' ? { color: "#f68714"} : {}} />
          </ListItemButton>
          <br /><br />
       
       
          <ListItemButton onClick={handleLogout} >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={<span >Logout</span>} />
          </ListItemButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {activeComponent === 'dashboard' && <AdminDashboard />}
        {activeComponent === 'order' && <OrderTable />}
        {activeComponent === 'user' && <UserTable />}
      </Box>

    </Box>
  );
}