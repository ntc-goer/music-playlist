import instance from "../http";

async function createPlaylist(form: FormData) {
  return await instance.post("/playlist", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function updatePlaylist(form: FormData) {
  return await instance.put("/playlist", form, {
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

async function getPlaylistById(id: string){
  return await instance.get(`/playlist/${id}`);
}
export { createPlaylist, getPlaylists, addPlaylistMusic,getPlaylistById, updatePlaylist };
