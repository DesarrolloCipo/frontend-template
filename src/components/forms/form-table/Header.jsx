import {
    Box,
    TableRow,
    TableCell,
    TableHead,
    TableSortLabel
} from "@mui/material";

const visuallyHidden = {
    border: 0,
    margin: -1,
    padding: 0,
    width: "1px",
    height: "1px",
    overflow: "hidden",
    position: "absolute",
    whiteSpace: "nowrap",
    clip: "rect(0 0 0 0)",
};

const Header = ({
    order,
    orderBy,
    headLabel,
    onRequestSort
}) => {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell key={headCell.id} align="center" sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel hideSortIcon active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? <Box sx={{ ...visuallyHidden }}>{order === "desc" ? "sorted descending" : "sorted ascending"}</Box> : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell align="center">
                    Acciones
                </TableCell>
            </TableRow>
        </TableHead>
    );
};

export default Header;