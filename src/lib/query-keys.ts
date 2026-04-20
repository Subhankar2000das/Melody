export const queryKeys = {
  songs: ["songs"] as const,
  song: (id: number) => ["songs", id] as const,
  songsByCategory: (category: string) =>
    ["songs", "category", category] as const,
  songsByAlbum: (albumId: number) =>
    ["songs", "album", albumId] as const,
  songsForAttach: (search?: string) =>
    ["songs", "attach", search ?? ""] as const,

  albums: ["albums"] as const,
  album: (id: number) => ["albums", id] as const,

  dashboardStats: ["dashboard-stats"] as const,
  usersCount: ["users-count"] as const,

  search: (keyword: string) => ["search", keyword] as const,

  likedSongs: (userId: string) => ["liked-songs", userId] as const,
  playlists: (userId: string) => ["playlists", userId] as const,
  playlistSongs: (playlistId: number) => ["playlist-songs", playlistId] as const,
};