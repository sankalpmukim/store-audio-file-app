import { Fab, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSong } from "../lib";

const SongListItem = ({ name, data, idx, id }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "0.5rem",
    }}
  >
    <Grid container>
      <Grid item xs={12} md={6} lg={4}>
        <Typography
          variant="overline"
          fontSize={20}
        >{`${idx}:${name}`}</Typography>
      </Grid>
      <Grid item xs={10} md={4} lg={4}>
        <audio
          controls
          preload="auto"
          // src={`data:audio/*;base64,${data}`}
        >
          <source src={`data:audio/x-wav;base64,${data}`} />
        </audio>
      </Grid>
      <Grid item xs={2} md={2} lg={4}>
        <Fab
          color="default"
          aria-label="add"
          onClick={() => {
            deleteSong(id);
          }}
        >
          <DeleteIcon />
        </Fab>
      </Grid>
    </Grid>
  </div>
);

export default SongListItem;
