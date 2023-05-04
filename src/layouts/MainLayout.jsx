import { ChevronLeft, ChevronRight, Menu as MenuIcon } from "@mui/icons-material";
import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    styled,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "../components";
import { AuthService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const drawerWidth = 220;

const MainLayout = ({ navigationData }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [extended, setExtended] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const styles = useStyles(useTheme());

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleExtendOpen = () => {
        setExtended(true);
    };

    const handleExtendClose = () => {
        setExtended(false);
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    }

    useEffect(() => {
        setMobileOpen(false);
    }, [location]);

    const drawer = (
        <>
            <StyledDiv sx={styles.toolbarIcon}>
                <IconButton
                    onClick={handleExtendClose}
                    sx={styles.collapseButton}>
                    <ChevronLeft />
                </IconButton>
            </StyledDiv>
            <Divider />
            <Navigation data={navigationData} collapsed={!extended} />
            <Divider />
            <Toolbar sx={styles.drawerFooter}>
                <Divider />
                <StyledDiv>
                    <IconButton
                        sx={{fontSize: 15, color: 'inherit'}}
                        onClick={handleLogout}
                        >
                        <Avatar sx={{ marginRight: 2, backgroundColor: 'crimson' }}>
                            {localStorage.getItem("username").charAt(0).toUpperCase()}
                        </Avatar>
                        Cerrar sesión
                    </IconButton>
                </StyledDiv>
            </Toolbar>
        </>
    );

    return (
        <StyledDiv sx={styles.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={[styles.appBarShift, extended && styles.appBar]}
            >
                <Toolbar sx={styles.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="extend drawer"
                        onClick={handleExtendOpen}
                        sx={[
                            styles.extendButton,
                            extended && styles.extendButtonHidden
                        ]}>
                        <ChevronRight />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={styles.menuButton}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={styles.appBarTitle}>
                        Bar Title
                    </Typography>
                    {/*<Switch
                        checked={themeSwitchConfig.state}
                        onChange={themeSwitchConfig.handler}
                        name="themeSwitch"
                        color="secondary"
                    />*/}
                </Toolbar>
            </AppBar>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
                <Drawer
                    variant="temporary"
                    anchor="left"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    PaperProps={{ sx: styles.drawerPaper }}
                    ModalProps={{ keepMounted: true }}>
                    {drawer}
                </Drawer>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
                <Drawer
                    variant='permanent'
                    PaperProps={{ sx: [styles.drawerPaper, !extended && styles.drawerPaperClose] }}
                    open={extended}>
                    {drawer}
                </Drawer>
            </Box>
            <StyledMain sx={[styles.contentShift, extended && styles.content]}>
                <StyledDiv sx={styles.toolbar} />
                <StyledDiv sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Outlet />
                </StyledDiv>
            </StyledMain>
        </StyledDiv>
    );
};

const StyledDiv = styled('div')({});
const StyledMain = styled('main')({});
const StyledLink = styled('a')({});

const useStyles = (theme) => ({
    root: {
        display: "flex",
        height: "100vh",
    },
    appBarShift: {
        [theme.breakpoints.up("sm")]: {
            zIndex: theme.zIndex.drawer + 2,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        },
    },
    appBar:{
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            zIndex: theme.zIndex.drawer + 2,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    collapseButton: {
        color: "inherit",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    extendButton: {
        marginRight: "36px",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    extendButtonHidden: {
        display: "none",
    },
    toolbar: {
        paddingRight: 24,
        ...theme.mixins.toolbar,
        backgroundColor: theme.palette.primary.main
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: `${drawerWidth}px`,
        display: "flex",
        position: "fixed",
        height: "100vh",
        whiteSpace: "nowrap",
        transition: theme.transitions.create(["width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        color: theme.palette.type === "light" && theme.palette.grey[100],
        backgroundColor: theme.palette.secondary.main,
        "::-webkit-scrollbar": {
            width: "0.25em"
        },
        "::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"
        },
        "::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(255,255,255,.25)",
            borderRadius: "10px"
        },
        [theme.breakpoints.down("md")]: {
            height: "90vh",
        }
    },
    drawerPaperClose: {
        [theme.breakpoints.up("sm")]: {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
        },
    },
    appBarTitle: {
        flex: 1,
        fontWeight: 200
    },
    contentShift: {
        flexGrow: 1,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(7),
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        },
    },
    content: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        },
    },
    drawerFooter: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        padding: 2,
    },
    copyrightText: {
        fontSize: 11,
        transition: "all .3s",
        [theme.breakpoints.up("sm")]: {
            opacity: (extend) => (extend ? 1 : 0),
        },
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
    },
});

export default MainLayout;