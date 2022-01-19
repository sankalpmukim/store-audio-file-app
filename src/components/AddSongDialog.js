import {
  Alert,
  Button,
  Container,
  Dialog,
  DialogTitle,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { encode } from "base64-arraybuffer";
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback, useState } from "react";
import { db } from "../db";

function checkIfNameExists(songs, name) {
  console.log(songs);
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    console.log(song.name.toLowerCase());
    if (song.name.toLowerCase() === name.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function AddSongDialog(props) {
  const { onClose, open, setOpen } = props;
  const songs = useLiveQuery(() => db.songs.toArray());
  const [formData, setFormData] = useState({
    name: "",
    priority: "",
    data: "",
  });

  const [result, setResult] = useState({
    type: "",
    message: "",
    open: false,
  });

  const handleClose = () => {
    onClose();
  };

  const reader = new FileReader();
  const fileByteArray = [];
  const addSong = async () => {
    if (formData.name.length === 0 || checkIfNameExists(songs, formData.name)) {
      setResult({
        message: "Please enter a unique name for the song!",
        type: "error",
        open: true,
      });
    } else if (formData.data.length === 0) {
      setResult({
        message: "Please select the audio file first!",
        type: "error",
        open: true,
      });
    } else {
      try {
        await db.songs.add({
          ...formData,
        });
        setFormData({ name: "", priority: "", data: "" });
        setResult({
          message: `Success! Added ${formData.name.toUpperCase()} to your playlist!`,
          type: "success",
          open: true,
        });
      } catch (err) {
        setResult({
          message: "Something went wrong... Please contact administrator!",
          type: "error",
          open: true,
        });
      }
      setOpen(false);
    }
  };

  const handleAlertClose = useCallback(
    (_event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setResult({ ...result, open: false });
    },
    [result]
  );

  return (
    <>
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
      {result.open ? (
        <Snackbar
          open={result.open}
          autoHideDuration={6000}
          onClose={handleAlertClose}
        >
          <Alert
            onClose={handleAlertClose}
            severity={result.type}
            sx={{ width: "100%" }}
          >
            {result.message}
          </Alert>
        </Snackbar>
      ) : null}
    </>
  );
}

export default AddSongDialog;
