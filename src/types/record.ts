export interface Record {
  id: number;
  track_name: string;
  track_artist: string;
  track_album_name: string;
  track_album_release_date: string;
  playlist_genre: string;
  playlist_subgenre: string;
  track_popularity: number;
  danceability: number;
  energy: number;
  tempo: number;
  duration_ms: number;
}
