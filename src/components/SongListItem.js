import { Fab, Grid, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSong } from "../lib";
import CentreDiv from "./CentreDiv";

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
      <Grid item xs={12} md={4} lg={3}>
        <Typography
          variant="overline"
          fontSize={20}
        >{`${idx}:${name}`}</Typography>
      </Grid>
      <Grid item xs={10} md={4} lg={4}>
        <CentreDiv>
          <audio
            style={{
              width: "100%",
              marginHorizontal: "1rem",
            }}
            controls
            preload="auto"
            // src={`data:audio/*;base64,${data}`}
          >
            <source src={`data:audio/x-wav;base64,${data}`} />
          </audio>
        </CentreDiv>
      </Grid>
      <Grid item xs={2} md={2} lg={4}>
        <CentreDiv>
          <Fab
            color="default"
            aria-label="add"
            onClick={() => {
              deleteSong(id);
            }}
          >
            <DeleteIcon />
          </Fab>
        </CentreDiv>
      </Grid>
    </Grid>
  </div>
);

export default SongListItem;
