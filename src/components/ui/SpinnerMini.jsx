import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Spinner({ size = "2.5rem" }) {
  return (
    <Box>
      <CircularProgress
        size={size}
        sx={{
          color: "var(--foreground)", // change stroke color
        }}
      />
    </Box>
  );
}

export default Spinner;
