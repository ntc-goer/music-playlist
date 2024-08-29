import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputField from "../atomics/InputField";
import InputRow from "../parts/InputRow";
import ImageUpload from "../atomics/ImageUpload";
import { getFormDataFromJSON, getFullUrl } from "../../ultis/common";
import { useCreatePlaylist, useUpdatePlaylist } from "../../http/playlist/hook";
import { Playlist } from "../../models/playlist";

interface PropsI {
  open: boolean;
  editPlaylistItem?: Playlist | null;
  handleClose: CallableFunction;
  refetchList: CallableFunction;
}

function CreatePlaylistPopup({
  open,
  handleClose,
  refetchList,
  editPlaylistItem,
}: PropsI) {
  const [playlist, setPlaylist] = useState<{
    id: string;
    name: string;
    thumbnail: File | null | string;
  }>({
    id: "",
    name: "",
    thumbnail: null,
  });

  const createPlaylist = useCreatePlaylist(handleClose, refetchList);
  const updatePlaylist = useUpdatePlaylist(handleClose, refetchList)
  
  useEffect(() => {
    if (editPlaylistItem && editPlaylistItem.id) {
      setPlaylist({
        id: editPlaylistItem.id,
        name: editPlaylistItem.name,
        thumbnail: getFullUrl(editPlaylistItem.thumbnailPath),
      });
    }
  }, [editPlaylistItem]);

  const closeDialog = () => {
    setPlaylist({
      id: "",
      name: "",
      thumbnail: null,
    });
    handleClose && handleClose();
  };

  const handleCreatePlaylist = () => {
    const formData = getFormDataFromJSON(playlist);
    if (playlist.id) {
      updatePlaylist.mutate({
        formData,
      });
    } else {
      createPlaylist.mutate({
        formData,
      });
    }
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
          {playlist.id ? "Edit" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreatePlaylistPopup;
