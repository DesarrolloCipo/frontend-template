import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Stack, TableCell, TableRow } from "@mui/material";

const ListRow = ({ handleDelete, handleEdit, row, tableHead }) => {

    return(
        <>
            <TableRow
                hover
                tabIndex={-1}
                role="row"
            >
                {tableHead.map((prop) => (
                    <TableCell key={`${prop.id} - ${row.id}`} scope="row" align="center">
                        {  prop.nested
                            ? (row[prop.nested.id][prop.nested.prop])
                            : (row[prop.id] || "")
                        }
                    </TableCell>
                ))}
                <TableCell scope="row">
                    <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton aria-label="edit" size="small" onClick={() => handleEdit()}>
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" onClick={() => handleDelete()}>
                            <Delete />
                        </IconButton>
                    </Stack>
                </TableCell>

            </TableRow>
        </>
    );
};

export default ListRow;