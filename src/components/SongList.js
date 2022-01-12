import { Typography } from "@mui/material";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../db";
import SongListItem from "./SongListItem";

const SongList = () => {
  const songs = useLiveQuery(() => db.songs.toArray());

  return (
    <>
      <div>
        {songs?.map((song, idx) => {
          return (
            <SongListItem
              key={song.id}
              idx={idx + 1}
              id={song.id}
              name={song.name}
              data={song.data}
            />
          );
        })}
      </div>
      {songs ? (
        songs.length !== 0 ? null : (
          <Typography variant="h6"> Click on + to add songs</Typography>
        )
      ) : null}
    </>
  );
};

export default SongList;
