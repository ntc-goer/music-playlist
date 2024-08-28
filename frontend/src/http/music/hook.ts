import { useMutation, useQuery } from "@tanstack/react-query";
import { createMusicTrack, deleteMusicTrack, getMusicTracks } from "./api";
import { useContext } from "react";
import { NotificationContext } from "../../components/parts/Notification";

const useCreateMusicTrack = (closePopup: CallableFunction, refetchList: CallableFunction) => {
  const notification = useContext(NotificationContext);
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      createMusicTrack(formData),
    onError(error) {
      closePopup();
      notification?.setErrorMsg(error.message);
    },
    onSuccess() {
      closePopup();
      refetchList()
      notification?.setSuccessMsg("Success");
    },
  });
};

const useGetMusicTracks = (page: number, pageSize: number, searchKeyword: string) => {
  return useQuery({
    queryKey: ["GET_MUSIC_TRACKS", page, searchKeyword],
    select(data) {
      return data.data;
    },
    queryFn: () => getMusicTracks(page, pageSize, searchKeyword),
  });
};

const useDeleteMusicTrack = ({onClose, refetchList}: {onClose: CallableFunction, refetchList: CallableFunction}) => {
  const notification = useContext(NotificationContext);
  return useMutation({
    mutationFn: (id: string) => deleteMusicTrack(id),
    onSuccess() {
      onClose();
      refetchList()
      notification?.setSuccessMsg("Delete successfully");
    },
    onError(error) {
      onClose();
      notification?.setErrorMsg(error.message);
    },
  });
};

export { useCreateMusicTrack, useGetMusicTracks, useDeleteMusicTrack };
