import { db } from "./db";

export function returnFileSize(number) {
  if (number < 1024) {
    return number + "bytes";
  } else if (number >= 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + "KB";
  } else if (number >= 1048576) {
    return (number / 1048576).toFixed(1) + "MB";
  }
}

export async function deleteSong(id) {
  await db.songs.where("id").equals(id).delete();
}

export async function updateSong(id, data) {
  await db.songs.update(id, data);
}
