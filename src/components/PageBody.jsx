import { Box } from "@mui/material";

const PageBody = ({ children, style }) => {
    return(
        <Box sx={{
            padding: 2,
            flex: 1,
            overflow: "auto",
            backgroundColor: 'background.default',
            ...style
        }}>
            {children}
        </Box>
    );
};

export default PageBody;