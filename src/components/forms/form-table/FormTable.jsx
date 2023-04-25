import { useEffect, useState } from "react";
import {
    Card,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import Header from "./Header";
import FormTableToolbar from "./Toolbar";
import Row from "./Row";
import FormDialog from "../../FormDialog";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc" ?
        (a, b) => descendingComparator(a, b, orderBy)
        :
        (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const FormTable = ({
    title,
    tableHead,
    newTitle,
    editTitle,
    dialogInitialValues,
    dialogValidationSchema,
    ...props
}) => {

    const formik = useFormikContext();

    const [field, meta] = useField(props);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState("asc");

    const [orderBy, setOrderBy] = useState("name");

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [dialogInputs, setDialogInputs] = useState(tableHead);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [dialogTitle, setDialogTitle] = useState(newTitle);

    const [dialogInitValues, setDialogInitValues] = useState(dialogInitialValues);

    const [editingIndex, setEditingIndex] = useState(field.value.length);

    useEffect(() => {
        const filterAutocomplete = () => {
            return tableHead.map((input) => {
                return input.fieldType === "autocomplete"
                    ? {...input, options: input.options.filter((opt) => {
                        return !field.value.some( sel => sel[input.id] === opt[input.optionVars.value]);
                    })}
                    : input;
            });
        };
        if(tableHead.some( el => el.fieldType === "autocomplete")){
            setDialogInputs(filterAutocomplete());
        }
    }, [field.value.length]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedData = applySortFilter(field.value, getComparator(order, orderBy));

    const handleNew = {
        action: newTitle,
        fn: () => {
            setDialogTitle(newTitle);
            setDialogInitValues(dialogInitialValues);
            setEditingIndex(field.value.length)
            setDialogOpen(true);
        }
    }

    const handleEdit = (row, i) => {
        setDialogTitle(editTitle);
        setDialogInitValues(row);
        setEditingIndex(i);
        setDialogOpen(true);
    }

    const handleDelete = (i) => {
        const updVal = field.value;
        updVal.splice(i, 1);
        formik.setFieldValue(field.name, updVal);
    }

    const handleSubmit = (newValue) => {
        const updVal = field.value;
        updVal.splice(editingIndex, 1, newValue);
        formik.setFieldValue(field.name, updVal);
    }

    return (
        <>
            <Card sx={{ borderRadius: 5 }}>
                <FormTableToolbar
                    title={title}
                    handleNew={handleNew}
                />
                <TableContainer>
                    <Table sx={{ width: 1 }}>
                        <Header
                            order={order}
                            orderBy={orderBy}
                            headLabel={tableHead}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
                                return (
                                    <Row
                                        key={i}
                                        handleDelete={() => handleDelete(i)}
                                        handleEdit={() => handleEdit(row, i)}
                                        row={row}
                                        tableHead={tableHead}
                                    />
                                );
                            })}
                            {field.value.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={tableHead.length + 1} align="center">No hay registros cargados</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={field.value.length}
                    rowsPerPage={rowsPerPage}
                    labelRowsPerPage="Filas por página"
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
            <FormDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                title={dialogTitle}
                initialValues={dialogInitValues}
                inputs={dialogInputs}
                validationSchema={dialogValidationSchema}
                submitHandler={handleSubmit}
            />
        </>
    );
};

export default FormTable;