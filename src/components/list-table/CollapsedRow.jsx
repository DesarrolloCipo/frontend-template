import { Box, Collapse, TableCell, TableRow } from "@mui/material"


const CollapsedRow = ({ children, open, span }) => {

    return(
        <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0}} colSpan={span}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{
                        margin: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {children}
                    </Box>
                </Collapse>
            </TableCell>
        </TableRow>
    );
};

export default CollapsedRow;