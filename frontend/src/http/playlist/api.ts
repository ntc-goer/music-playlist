import instance from "../http";

async function createPlaylist(form: FormData) {
  return await instance.post("/playlist", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function getPlaylists(page: number, pageSize: number, keyword: string) {
  return await instance.get(
    `/playlist?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  );
}

async function addPlaylistMusic(payload: {
  musicId: string;
  playlistIds: string[];
}) {
  return await instance.post(`/playlist/add`, payload);
}

export { createPlaylist, getPlaylists, addPlaylistMusic };
