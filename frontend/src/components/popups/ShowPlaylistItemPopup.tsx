import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { getFullUrl } from "../../ultis/common";
import { useGetPlaylistById } from "../../http/playlist/hook";
import { MusicTrack } from "../../models/music";
import defaultImage from "./../../assets/images/default_image.png"

interface PropsI {
  open: boolean;
  playlistId: string;
  onClose?: CallableFunction;
}

function ShowPlaylistItemPopup({ open, playlistId, onClose }: PropsI) {
  const { data } = useGetPlaylistById(playlistId);
  const closeDialog = () => {
    onClose && onClose();
  };
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "20px" }}
    >
      <DialogTitle id="alert-dialog-title">{"Playlist Content"}</DialogTitle>
      <DialogContent sx={{ minWidth: "500px" }}>
        <Grid container>
          {data?.songDetailList && data?.songDetailList.length > 0 ? (
            data.songDetailList?.map((item: MusicTrack) => (
              <Stack
                key={item.id}
                direction={"row"}
                justifyContent={"space-between"}
                width={"100%"}
                sx={{ mb: "20px" }}
              >
                <Stack direction={"row"} alignItems={"center"}>
                  <img
                    src={item.thumbnailName ? getFullUrl(item.thumbnailName): defaultImage}
                    alt=""
                    width={"50px"}
                    height={"50px"}
                  />
                  <Typography sx={{ ml: "10px" }}>{item.name}</Typography>
                </Stack>
              </Stack>
            ))
          ) : (
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{ width: "100%", fontSize: "20px", padding: "20px" }}
            >
              No Item Founded
            </Stack>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default ShowPlaylistItemPopup;
