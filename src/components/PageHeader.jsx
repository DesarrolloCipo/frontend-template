import { Box, Divider, Toolbar, Typography } from "@mui/material";


const PageHeader = ({ title, children, style }) => {
    
    return(
        <>
            <Box position="fixed" width="100%" zIndex={2}>
                <Toolbar
                    variant="dense"
                    sx={{
                        backgroundColor: "background.default", //here
                        color: "text.default", //here
                        display: "flex"
                    }}
                    style={{ ...style }}>
                    {title && (
                        <Typography
                            sx={{
                                fontWeight: 400,
                                marginRight: 2
                            }}
                            variant="h6"
                            noWrap>
                            {title}
                        </Typography>
                    )}
                    {children}
                </Toolbar>
                <Divider />
            </Box>
            <Toolbar variant="dense" />
        </>
    );
};

export default PageHeader;