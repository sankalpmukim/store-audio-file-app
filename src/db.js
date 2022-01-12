import Dexie from "dexie";

export const db = new Dexie("myDatabase");
db.version(1).stores({
  songs: "++id, name, data, priority",
});
