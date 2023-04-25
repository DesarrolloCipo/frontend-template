import { Paper, Typography } from "@mui/material";

const SearchNotFound = ({ searchQuery = "", ...other }) => {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        No encontrado
      </Typography>
      <Typography variant="body2" align="center">
        No hay resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Revise la búsqueda.
      </Typography>
    </Paper>
  );
};

export default SearchNotFound;