import { useMutation } from "@tanstack/react-query";
import { createMusicTrack } from "./api";

const useCreateMusicTrack = () => {
  return useMutation({
    mutationFn: ({ formData }: { formData: FormData }) =>
      createMusicTrack(formData),
    onError(error, variables, context) {
      console.log("error", error);
    },
    onSuccess(data, variables, context) {
      console.log("data", data);
    },
  });
};

export { useCreateMusicTrack };
