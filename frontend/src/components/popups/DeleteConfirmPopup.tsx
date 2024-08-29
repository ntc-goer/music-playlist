import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useDeleteMusicTrack } from "../../http/music/hook";
import { useDeletePlaylist } from "../../http/playlist/hook";

interface PropsI {
  songId?: string;
  playlistId?: string;
  onClose: CallableFunction;
  refetchList: CallableFunction;
  message?: string;
}

function DeleteConfirmPopup({
  onClose,
  message,
  refetchList,
  songId,
  playlistId,
}: PropsI) {
  const deleteMusicTrack = useDeleteMusicTrack({ onClose, refetchList });
  const deletePlaylist = useDeletePlaylist({ onClose, refetchList });
  const handleDeleteSong = () => {
    if (songId) {
      deleteMusicTrack.mutate(songId);
    } else if (playlistId) {
      deletePlaylist.mutate(playlistId);
    }
  };
  return (
    <Dialog
      open={Boolean(songId) || Boolean(playlistId)}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Item</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message || "Do you want to delete this item ?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Cancel</Button>
        <Button autoFocus onClick={handleDeleteSong}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmPopup;
