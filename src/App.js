import React, { useState } from "react";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { AppBar, Container, Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Content from "./components/Content";
import AddSongDialog from "./components/AddSongDialog";

function App() {
  const [addSongOpen, setAddSongOpen] = useState(false);
  const handleClickOpen = () => {
    setAddSongOpen(true);
  };
  const handleClose = () => {
    setAddSongOpen(false);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem",
          }}
        >
          <Typography variant="h3">Your browser playlist</Typography>
          <Fab color="default" aria-label="add" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
      <Container>
        <Content />
      </Container>
      <AddSongDialog
        open={addSongOpen}
        onClose={handleClose}
        setOpen={setAddSongOpen}
      />
    </>
  );
}

export default App;
