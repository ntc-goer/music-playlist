import instance from "../http";

async function createMusicTrack(form: FormData) {
  return await instance.post("/music", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function updateMusicTrack(form: FormData) {
  return await instance.put("/music", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

async function getMusicTracks(page: number, pageSize: number, keyword: string) {
  return await instance.get(
    `/music?page=${page}&pageSize=${pageSize}&keyword=${keyword}`
  );
}

async function deleteMusicTrack(id: string) {
  return await instance.delete(`/music/${id}`);
}

async function getMusicById(id: string) {
  return await instance.get(`/music/${id}`);
}
export {
  createMusicTrack,
  getMusicTracks,
  deleteMusicTrack,
  updateMusicTrack,
  getMusicById,
};
