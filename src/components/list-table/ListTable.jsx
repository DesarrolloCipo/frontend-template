import { useState } from "react";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from "@mui/material";
import ListHead from "./ListHead";
import SearchNotFound from "./SearchNotFound";
import ListToolbar from "./ListToolbar";
import ListRow from "./ListRow";
import { filter } from "lodash";

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

function applySortFilter(array, comparator, query, filterName) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query && filterName) {
    /* return array.query((_row) =>
      Object.values(_row).some((value) =>
        value.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
      )
    ); */
    const keys = filterName.split('.');

    return filter(array, (_item) => {
      if(keys.length === 1){
        return _item[filterName]
          ? _item[filterName].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
          : 0
      }else{
        return _item[keys[0]][keys[1]]
          ? _item[keys[0]][keys[1]].toString().toLowerCase().indexOf(query.toLowerCase()) !== -1
          : 0
      }
    });
  }
  return stabilizedThis.map((el) => el[0]);
}

const ListTable = ({
  dataList,
  tableHead,
  firstOrder,
  handleNew,
  handleEdit,
  handlePrint,
  handleDelete,
  handleExport,
  collapsible = false,
  collapsedContent = null
}) => {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("desc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState(firstOrder);

  const [searchQuery, setSearchQuery] = useState("");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dataList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  }

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataList.length) : 0;

  const filteredData = applySortFilter(dataList, getComparator(order, orderBy), searchQuery, filterName);

  const isSearchNotFound = filteredData.length === 0;

  return (
    <Card sx={{ borderRadius: 5 }}>
      <ListToolbar
        tableHead={tableHead}
        selected={selected}
        query={searchQuery}
        setQuery={handleQueryChange}
        filter={filterName}
        setFilter={handleFilterChange}
        handleNew={handleNew}
        handleEdit={handleEdit}
        handlePrint={handlePrint}
        handleDelete={handleDelete}
        handleExport={handleExport}
      />
      <TableContainer>
        <Table sx={{ minWidth: 800 }}>
          <ListHead
            order={order}
            orderBy={orderBy}
            headLabel={tableHead}
            rowCount={dataList.length}
            numSelected={selected.length}
            onRequestSort={handleRequestSort}
            onSelectAllClick={handleSelectAllClick}
            collapsible={collapsible}
          />
          <TableBody>
            {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const { id } = row;
              const isRowSelected = selected.indexOf(id) !== -1;
              return (
                <ListRow
                  key={id}
                  isRowSelected={isRowSelected}
                  handleClick={handleClick}
                  row={row}
                  tableHead={tableHead}
                  collapsible={collapsible}
                  CollapsedContent={collapsedContent}
                />
              );
            })}
            {emptyRows > 0 || dataList.length === 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={tableHead.length + 2} align="center">No hay registros</TableCell>
              </TableRow>
            )}
          </TableBody>
          {isSearchNotFound && dataList.length !== 0 && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={tableHead.length + 2} sx={{ py: 3 }}>
                  <SearchNotFound searchQuery={searchQuery} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={dataList.length}
        rowsPerPage={rowsPerPage}
        labelRowsPerPage="Filas por página"
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default ListTable;