"use client"

import React, { useEffect, useState } from "react";
import { ChildrenType } from "@/types/children";
import { useRouter } from 'next/navigation';
import useAuth from "@/store/auth";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import { USER_DATA, USER_TOKEN } from "@/constants";
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';

import useScreenSize from "@/utils/useScreen";
import "@/styles/dashboard.scss";
import { usePathname } from 'next/navigation'



const drawerWidth: number = 140;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
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
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      backgroundColor: "#0c0f22",
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Dashboard({ children }: ChildrenType) {
  const screenSize = useScreenSize();
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);

  const pathname = usePathname();
  console.log(pathname)

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role !== 1) {
        router.push("/")
      }
    } else {
      router.push("/login")
    }
  }, [isAuthenticated, router, user?.role])

  useEffect(() => {
    if (screenSize < 850) {
      setOpen(false);
    } else {
      setOpen(true)
    }
  }, [screenSize])
  
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    localStorage.removeItem(USER_DATA);
    Cookies.remove(USER_TOKEN);
    setIsAuthenticated(user);
    router.push("/users")
  }

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex', position: "fixed", inset: "0" }}>
        {/* <CssBaseline /> */}
        <AppBar className="layout-top" style={{backgroundColor: "#ffc700", height: "90px"}} position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            {/* <IconButton
              className="dashboard-toggle"
              edge="start"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            > */}
              {/* <MenuIcon style={{fill: "#fff"}} />
            </IconButton> */}
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Vodiy Parfum
            </Typography>
            
          </Toolbar>
        </AppBar>
        <Drawer className="dashboard-sidebar" style={{backgroundColor: "#000"}} variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
            
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List className="nav" component="nav">
            <React.Fragment>
              <Link className={`dashboard-link ${pathname === "/admin" ? "active" : ""}`} href="/admin">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/users" ? "active" : ""}`} href="/admin/users">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Foydalanuvchi" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/allorders" ? "active" : ""}`} href="/admin/allorders">
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Buyurtma" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/categories" ? "active" : ""}`} href="/admin/categories">
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Kategoriya" />
              </Link>
              <Link className={`dashboard-link ${pathname === "/admin/products" ? "active" : ""}`} href="/admin/products">
                <ListItemIcon>
                  <Inventory2Icon />
                </ListItemIcon>
                <ListItemText primary="Mahsulot" />
              </Link>
            </React.Fragment>
            <Link className={`dashboard-link ${pathname === "/admin/profile" ? "active" : ""}`} href="/admin/profile">
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Shaxsiy" />
            </Link>
            <Link className={`dashboard-link ${pathname === "/login" ? "active" : ""}`} href="/login">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Chiqish" onClick={logout} />
              </Link>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? "theme.palette.grey[100]"
                : theme.palette.grey[800],
            flexGrow: 1,
            height: "100vh",
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}