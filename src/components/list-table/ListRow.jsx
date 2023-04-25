import { useState } from "react";
import { Checkbox, Chip, IconButton, TableCell, TableRow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import CollapsedRow from "./CollapsedRow";

const ListRow = ({ isRowSelected, handleClick, row, tableHead, collapsible, CollapsedContent }) => {

    const [open, setOpen] = useState(false);

    return(
        <>
            <TableRow
                hover
                tabIndex={-1}
                role="checkbox"
                selected={isRowSelected}
                aria-selected={isRowSelected}
            >

                {collapsible && <TableCell sx={{ width: 5 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                </TableCell>}

                <TableCell padding="checkbox">
                    <Checkbox checked={isRowSelected} onChange={(event) => handleClick(event, row.id)} />
                </TableCell>

                {tableHead.map((prop, i) => (
                    <TableCell key={`${prop.id} - ${row.id} - ${i}`} align="center" scope="row">
                        {prop.opts
                                ? <Chip
                                    variant="outlined"
                                    color="secondary"
                                    label={row[prop.id] ? prop.opts[0] : prop.opts[1]}
                                />
                                : (prop.nested ? row[prop.id][prop.nested] : row[prop.id])
                            }
                    </TableCell>
                ))}

            </TableRow>

            {collapsible && CollapsedContent && <CollapsedRow open={open} span={tableHead.length + 2}>
                <CollapsedContent row={row} />
            </CollapsedRow> }
        </>
    );
};

export default ListRow;