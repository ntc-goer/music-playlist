import instance from "./http";

async function createMusicTrack(form: FormData) {
  return await instance.post("/music", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export { createMusicTrack };
