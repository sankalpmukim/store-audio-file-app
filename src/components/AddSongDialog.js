import {
  Button,
  Container,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { encode } from "base64-arraybuffer";
import { useState } from "react";
import { db } from "../db";

function AddSongDialog(props) {
  const { onClose, open, setOpen } = props;
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
    data: "",
  });

  const handleClose = () => {
    onClose();
  };

  const reader = new FileReader();
  const fileByteArray = [];
  const addSong = async () => {
    try {
      await db.songs.add({
        ...formData,
      });
      setFormData({ name: "", priority: "" });
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog onClose={handleClose} open={open} sx={{ padding: "1rem" }}>
      <DialogTitle>Add song</DialogTitle>
      <TextField
        sx={{ margin: "1rem" }}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
        }}
      />
      {/* <TextField
        sx={{ margin: "1rem" }}
        id="outlined-basic"
        label="Data"
        variant="outlined"
        value={formData.data}
        onChange={(e) => {
          setFormData({ ...formData, data: e.target.value });
        }}
      /> */}
      <Container>
        <label htmlFor="audio-file">
          <Typography variant="h6">Select audio file:</Typography>
          <input
            id="audio-file"
            type="file"
            accept="audio/*"
            onChange={(e) => {
              reader.readAsArrayBuffer(e.target.files[0]);
              reader.onloadend = (evt) => {
                if (evt.target.readyState === FileReader.DONE) {
                  const arrayBuffer = evt.target.result,
                    array = new Uint8Array(arrayBuffer);
                  for (const a of array) {
                    fileByteArray.push(a);
                  }
                  setFormData({ ...formData, data: encode(fileByteArray) });
                }
              };
            }}
          />
        </label>
      </Container>
      <Button sx={{ margin: "1rem" }} variant="contained" onClick={addSong}>
        Add this song
      </Button>
    </Dialog>
  );
}

export default AddSongDialog;
