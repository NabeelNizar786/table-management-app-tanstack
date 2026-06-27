import csv from "csvtojson";
import { writeFileSync } from "fs";

async function convert() {
  const records = await csv().fromFile("data/spotify_songs.csv");

  const formatted = records.map((record, index) => ({
    id: index + 1,
    track_name: record.track_name,
    track_artist: record.track_artist,
    track_album_name: record.track_album_name,
    track_album_release_date: record.track_album_release_date,
    playlist_genre: record.playlist_genre,
    playlist_subgenre: record.playlist_subgenre,
    track_popularity: Number(record.track_popularity),
    danceability: Number(record.danceability),
    energy: Number(record.energy),
    tempo: Number(record.tempo),
    duration_ms: Number(record.duration_ms),
  }));

  writeFileSync("db.json", JSON.stringify({ records: formatted }, null, 2));

  console.log("db.json created successfully");
}

convert();
