import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import SongList from "./SongList";

const Content = () => {
  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <Box sx={{ marginBottom: "1rem" }}>
        <Typography variant="h4">These are your saved songs</Typography>
      </Box>
      <SongList />
    </div>
  );
};
export default Content;
