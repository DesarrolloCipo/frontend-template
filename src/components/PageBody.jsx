import { Box, useTheme } from "@mui/material";

const PageBody = ({ children, style }) => {
    return(
        <Box
            style={{
                padding: 2,
                flex: 1,
                overflow: "auto",
                //backgroundColor?
                ...style
            }}>
            {children}
        </Box>
    );
};

export default PageBody;