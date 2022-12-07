import { ChevronLeft, ChevronRight, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "../components";


const drawerWidth = 210;

const MainLayout = ({ navigationData, children }) => {
    const location = useLocation();
    const [extended, setExtended] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

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
            <div sx={{}}>
                <IconButton
                    onClick={handleExtendClose}
                    sx={{}}>
                    <ChevronLeft />
                </IconButton>
            </div>
            <Divider />
            <Navigation data={navigationData} collapsed={!extended} />
            <Divider />
            <Toolbar sx={{}}>
                <Typography component="p" variant="body2" align="center">
                    ¡Hello World!
                </Typography>
            </Toolbar>
        </>
    );

    return (
        <div> {/*styles?*/}
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{}}
            >
                <Toolbar sx={{}}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="extend drawer"
                        onClick={handleExtendOpen}
                        sx={{}}>
                        <ChevronRight />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{}}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap sx={{}}>
                        Responsive SideBar Layout
                    </Typography>
                    {/* Maybe switch themes*/}
                </Toolbar>
            </AppBar>
            <Hidden smUp implementation="css">
                <Drawer
                    variant="temporary"
                    anchor="rigth"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    //classes?
                    ModalProps={{ keepMounted: true }}>
                    {drawer}
                </Drawer>
            </Hidden>
            <Hidden xsDown implementation='css'>
                <Drawer
                    variant='permanent'
                    //classes?
                    open={extended}>
                    {drawer}
                </Drawer>
            </Hidden>
            <main>{/* styles? */}
                <div /> {/* styles as toolbar*/}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

const styles = {
    root: {
        display: "flex",
        height: "100vh",
    },
    appBarShift: {
        zIndex: [null, "theme.zIndex.drawer" + 2],
        transition: [null,
            (theme) => {theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            })}
        ]
    },
    appBar: {
        width: [null, `calc(100% - ${drawerWidth}px)`],
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
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
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    extendButton: {
        marginRight: 36,
        [theme.breakpoints.down("xs")]: {
            display: "none",
        },
    },
    extendButtonHidden: {
        display: "none",
    },
    toolbar: { paddingRight: 24, ...theme.mixins.toolbar },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        width: drawerWidth,
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
        fontWeight: 200,
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
            marginLeft: drawerWidth,
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
        padding: theme.spacing(2),
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
};

export default MainLayout;