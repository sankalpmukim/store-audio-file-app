import { Typography } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";

const SongList = () => {
  const songs = useLiveQuery(() => db.songs.toArray());

  return (
    <>
      <ul>
        {songs?.map((song) => {
          return (
            <li key={song.id}>
              {song.name}, {song.data.substring(0, 10)}
            </li>
          );
        })}
      </ul>
      {songs ? (
        songs.length !== 0 ? (
          <pre>{JSON.stringify(songs.length, null, 4)}</pre>
        ) : (
          <Typography variant="h6"> Click on + to add songs</Typography>
        )
      ) : null}
    </>
  );
};

export default SongList;
