import { ChevronLeft, ChevronRight, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, styled, Switch, Toolbar, Typography, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "../components";
import { ThemeContext } from "../themes";

const drawerWidth = 210;

const MainLayout = ({ navigationData }) => {
    const location = useLocation();
    const [extended, setExtended] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);
    const styles = useStyles(useTheme());
    const { themeSwitchConfig } = useContext(ThemeContext);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleExtendOpen = () => {
        setExtended(true);
    };

    const handleExtendClose = () => {
        setExtended(false);
    };

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
                <Typography component="p" variant="body2" align="center">
                    <StyledLink
                        sx={styles.copyrightText}
                        href='https://github.com/trutoro/react-material-sidebar'
                        rel='noreferrer'
                        target='_blank'
                    >
                        Credits to Pritthish Nath
                    </StyledLink>
                    -
                    <StyledLink
                        sx={styles.copyrightText}
                        href='https://github.com/Raam4'
                        rel='noreferrer'
                        target='_blank'
                    >
                        Updated by Raama
                    </StyledLink>
                </Typography>
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
                        Responsive SideBar Layout
                    </Typography>
                    <Switch
                        checked={themeSwitchConfig.state}
                        onChange={themeSwitchConfig.handler}
                        name="themeSwitch"
                        color="secondary"
                    />
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