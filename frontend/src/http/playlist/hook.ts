import { useContext } from "react";
import { NotificationContext } from "../../components/parts/Notification";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addPlaylistMusic, createPlaylist, getPlaylistById, getPlaylists, updatePlaylist } from "./api";

const useCreatePlaylist = (
  closePopup: CallableFunction,
  refetchList: CallableFunction
) => {
  const notification = useContext(NotificationContext);
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      createPlaylist(formData),
    onError(error) {
      closePopup && closePopup();
      notification?.setErrorMsg(error.message);
    },
    onSuccess() {
      closePopup && closePopup();
      refetchList();
      notification?.setSuccessMsg("Create Successfully");
    },
  });
};

const useUpdatePlaylist = (
  closePopup: CallableFunction,
  refetchList: CallableFunction
) => {
  const notification = useContext(NotificationContext);
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      updatePlaylist(formData),
    onError(error) {
      closePopup && closePopup();
      notification?.setErrorMsg(error.message);
    },
    onSuccess() {
      closePopup && closePopup();
      refetchList();
      notification?.setSuccessMsg("Update Playlist Successfully");
    },
  });
};

const useGetPlaylists = (page: number, pageSize: number, keyword: string) => {
  return useQuery({
    queryKey: ["GET_PLAYLISTS", page, keyword],
    select(data) {
      return data.data;
    },
    queryFn: () => getPlaylists(page, pageSize, keyword),
  });
};

const useGetPlaylistById = (id: string) => {
  return useQuery({
    queryKey: ["GET_PLAYLIST_BY_ID", id],
    select(data) {
      return data.data;
    },
    queryFn: () => getPlaylistById(id),
    enabled: Boolean(id)
  });
};

const useAddPlaylistMusic = (closePopup?: CallableFunction) => {
  const notification = useContext(NotificationContext);
  return useMutation({
    mutationFn: (data: { musicId: string; playlistIds: string[] }) =>
      addPlaylistMusic(data),
    onError(error) {
      closePopup && closePopup();
      notification?.setErrorMsg(error.message);
    },
    onSuccess() {
      closePopup && closePopup();
      notification?.setSuccessMsg("Add Track To Playlist Successfully");
    },
  });
};

export { useCreatePlaylist, useGetPlaylists, useAddPlaylistMusic, useGetPlaylistById, useUpdatePlaylist };
