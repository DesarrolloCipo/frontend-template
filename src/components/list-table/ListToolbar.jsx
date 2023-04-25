import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    styled,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";
import { AddBox, CarRental, Delete, Edit, FileDownload, Print, Search } from "@mui/icons-material";
import { isUndefined } from "lodash";

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(["box-shadow", "width"], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    "&.Mui-focused": { width: 320, boxShadow: `0px 2px 8px ${(theme.palette.grey[900], 0.15)}` },
    "& fieldset": {
        borderWidth: `1px !important`,
        borderColor: `${theme.palette.grey[500_32]} !important`,
    },
}));

const ListToolbar = ({
    tableHead,
    selected,
    query,
    setQuery,
    filter,
    setFilter,
    handleNew,
    handleEdit,
    handlePrint,
    handleDelete,
    handleExport
}) => {
    return (
        <RootStyle
            sx={{
                ...(selected.length > 0 && {
                    color: "primary.main",
                    bgcolor: "primary.lighter",
                }),
            }}
        >
            <div>
                <SearchStyle
                    value={query}
                    onChange={setQuery}
                    placeholder="Buscar..."
                    startAdornment={
                        <InputAdornment position="start">
                            <Search sx={{ color: "text.disabled", width: 20, height: 20 }} />
                        </InputAdornment>
                    }
                />
                <FormControl sx={{ minWidth: 200, marginLeft: 2 }}>
                    <InputLabel id="filter-label">Buscar por...</InputLabel>
                    <Select
                        id="filter"
                        labelId="filter-label"
                        value={filter}
                        onChange={setFilter}
                        label="Buscar por..."
                    >
                        {tableHead.map((item, i) => {
                            if (/* isUndefined(item.date) &&  */isUndefined(item.opts)) {
                                return (
                                    <MenuItem
                                        key={i}
                                        value={item.nested ? `${item.id}.${item.nested}` : item.id}
                                    >
                                        {item.label}
                                    </MenuItem>);
                            }
                        })}
                    </Select>
                </FormControl>
            </div>
            {selected.length > 0 && (
                <Typography component="div" variant="subtitle1">
                    {selected.length} seleccionado{selected.length > 1 ? "s" : ""}
                </Typography>
            )}
            {selected.length > 0 ? (<div>
                {selected.length === 1 && handleEdit &&
                    <Tooltip title={`${handleEdit.action}`}>
                        <IconButton color="warning" onClick={() => handleEdit.fn(selected[0])}>
                            <Edit fontSize="large" />
                        </IconButton>
                    </Tooltip>}
                {selected.length === 1 && handlePrint &&
                    <Tooltip title={`${handlePrint.action}`}>
                        <IconButton color="success" onClick={() => handlePrint.fn(selected[0])}>
                            <Print fontSize="large" />
                        </IconButton>
                    </Tooltip>}
                {handleDelete &&
                    <Tooltip title={`${handleDelete.action}`}>
                        <IconButton color="error" onClick={() => handleDelete.fn(selected)}>
                            <Delete fontSize="large" />
                        </IconButton>
                    </Tooltip>}
                {handleExport &&
                    <Tooltip title={handleExport.action}>
                        <IconButton color="primary" onClick={() => handleExport.fn(selected)}>
                            <FileDownload fontSize="large" />
                        </IconButton>
                    </Tooltip>}
            </div>) : (<div>
                {handleNew &&
                    <Tooltip title={handleNew.action}>
                        <IconButton color="primary" onClick={() => handleNew.fn()}>
                            <AddBox fontSize="large" />
                        </IconButton>
                    </Tooltip>}
            </div>)
            }
        </RootStyle>
    );
};

export default ListToolbar;