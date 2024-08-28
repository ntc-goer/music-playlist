import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Checkbox,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getFullUrl } from "../../ultis/common";
import {
  useAddPlaylistMusic,
  useGetPlaylists,
} from "../../http/playlist/hook";
import { Playlist } from "../../models/playlist";

interface PropsI {
  open: boolean;
  musicId: string;
  handleClose?: CallableFunction;
  refetchList: CallableFunction
}

function AddMusicToPlaylistPopup({ open, musicId, handleClose }: PropsI) {
  const { data } = useGetPlaylists(1, 10, "");
  const addPlaylistMusic = useAddPlaylistMusic(handleClose);

  const [addPlaylistData, setAddPlaylistData] = useState<{
    musicId: string;
    playlistIds: string[];
  }>({
    musicId,
    playlistIds: [],
  });

  const onToggleCheckbox = (playlistId: string, checked: boolean) => {
    if (!addPlaylistData.playlistIds.includes(playlistId) && checked) {
      setAddPlaylistData({
        ...addPlaylistData,
        playlistIds: [...addPlaylistData.playlistIds, playlistId],
      });
    }
    if (addPlaylistData.playlistIds.includes(playlistId) && !checked) {
      const newPlaylistIds = addPlaylistData.playlistIds.filter(
        (item: string) => item != playlistId
      );
      setAddPlaylistData({ ...addPlaylistData, playlistIds: newPlaylistIds });
    }
  };
  const closeDialog = () => {
    setAddPlaylistData({
      musicId: "",
      playlistIds: [],
    });
    handleClose && handleClose();
  };

  const handleAddPlaylist = () => {
    addPlaylistMusic.mutate({
      ...addPlaylistData,
      musicId,
    });
  };
  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "20px" }}
    >
      <DialogTitle id="alert-dialog-title">
        {"Select your playlist"}
      </DialogTitle>
      <DialogContent sx={{ minWidth: "500px" }}>
        <Grid container>
          {data?.map((item: Playlist) => (
            <Stack
              key={item.id}
              direction={"row"}
              justifyContent={"space-between"}
              width={"100%"}
              sx={{ mb: "20px" }}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <img
                  src={getFullUrl(item.thumbnailPath)}
                  alt=""
                  width={"50px"}
                  height={"50px"}
                />
                <Typography sx={{ ml: "10px" }}>{item.name}</Typography>
              </Stack>
              <Checkbox
                onChange={(e, checked) => onToggleCheckbox(item.id, checked)}
              />
            </Stack>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          autoFocus
          variant="contained"
          sx={{ padding: "10px 50px" }}
          onClick={handleAddPlaylist}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMusicToPlaylistPopup;
