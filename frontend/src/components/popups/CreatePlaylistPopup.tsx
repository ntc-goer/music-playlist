import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { useState } from "react";
import InputField from "../atomics/InputField";
import InputRow from "../parts/InputRow";
import ImageUpload from "../atomics/ImageUpload";
import { getFormDataFromJSON } from "../../ultis/common";
import { useCreatePlaylist } from "../../http/playlist/hook";

interface PropsI {
  open: boolean;
  handleClose: CallableFunction;
  refetchList: CallableFunction
}

function CreatePlaylistPopup({ open, handleClose, refetchList }: PropsI) {
  const [playlist, setPlaylist] = useState<{
    name: string;
    thumbnail: File | null;
  }>({
    name: "",
    thumbnail: null,
  });

  const createPlaylist = useCreatePlaylist(handleClose, refetchList)

  const closeDialog = () => {
    setPlaylist({
      name: "",
      thumbnail: null,
    });
    handleClose && handleClose();
  };

  const handleCreatePlaylist = () => {
    const formData = getFormDataFromJSON(playlist);
    createPlaylist.mutate({
      formData,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "10px" }}
    >
      <DialogTitle id="alert-dialog-title">{"Create Playlist"}</DialogTitle>
      <DialogContent>
        <Grid container>
          <InputRow label="Name">
            <InputField
              value={playlist.name}
              onChange={(name: string) => setPlaylist({ ...playlist, name })}
              placeholder="My Playlist..."
            />
          </InputRow>
          <InputRow label="Thumbnail">
            <ImageUpload
              onChange={(file: File) =>
                setPlaylist({ ...playlist, thumbnail: file })
              }
              value={playlist.thumbnail}
            />
          </InputRow>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          autoFocus
          variant="contained"
          sx={{ padding: "10px 50px" }}
          onClick={handleCreatePlaylist}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePlaylistPopup;
