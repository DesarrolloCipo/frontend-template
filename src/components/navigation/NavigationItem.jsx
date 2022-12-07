import { useEffect, useState } from "react";
import {
    Collapse,
    lighten,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const NavigationItem = ({ item, collapsed }) => {
    const { pathname } = useLocation();

    //If nested nav
    const [open, setOpen] = useState(false);
    const nested = typeof item.navigationData === "object" ? true : false;

    const handleClick = () => {
        setOpen(!open);
    }

    useEffect(() => {
        if (pathname.search(new RegExp(item.url, "g")) !== -1) {
            setOpen(true);
        }
    }, [pathname, item.url]);

    return (
        <div sx={[
            styles.root,
            nested && open && styles.expanded,
            pathname.search(new RegExp(item.url, "g")) !== -1 &&
                !nested && styles.selected
        ]}>
            <ListItemButton
                sx={styles.listItem}
                onClick={handleClick}
                disableGutters>
                <Box
                    sx={[
                        styles.listLink,
                        collapsed && styles.listLinkCollapsed
                    ]}
                    component={!nested ? Link : "div"}
                    to={`${item.url}`}>
                    <ListItemIcon sx={styles.listIcon}>
                        {(item.icon) && <item.icon /> || ""}
                    </ListItemIcon>
                    <ListItemText /*check style*/ >
                        {item.name}
                    </ListItemText>
                    {nested &&
                        (open ? (
                            <ExpandLess fontSize={collapsed ? "inherit" : "default"} />
                        ) : (
                            <ExpandMore fontSize={collapsed ? "inherit" : "default"} />
                        ))}
                </Box>
            </ListItemButton>

            {nested && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        {item.navigationData.map((nestedItem, i) => {
                            return (
                                <NavigationItem
                                    key={i}
                                    item={nestedItem}
                                    collapsed={collapsed}
                                />
                            )
                        })}
                    </List>
                </Collapse>
            )}
        </div>
    );
}

const styles = {
    root: {
        width: "95%",
        margin: "4px auto",
        borderRadius: "8px",
        transition: "all .5s",
        overflow: "hidden",
    },
    listItem: {
        transition: "all .5s",
        display: "flex",
        flexDirection: "column",
    },
    listLink: {
        padding: "0 15px",
        textDecoration: "none",
        color: "inherit",
        transition: "all .5s",
        display: "flex",
        alignItems: "center",
        width: "100%",
    },
    listLinkCollapsed: {
        width: [null, 7/10],
        flexDirection: [null, "column"],
        justifyContent: [null, "center"]
    },
    listIcon: {
        color: "inherit",
        justifyContent: "center",
    },
    listItemText: {
        fontSize: [null, 9]
    },
    expanded: {
        backgroundColor: lighten("theme.palette.secondary.main", 0.1),
    },
    selected: {
        backgroundColor: lighten("theme.palette.secondary.main", 0.3),
    }
};

export default NavigationItem;