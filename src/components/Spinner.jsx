import { CircularProgress } from "@mui/material";

const Spinner = () => {
    return(
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <CircularProgress thickness={4} size={100} color="primary" />
        </div>
    );
};

export default Spinner;