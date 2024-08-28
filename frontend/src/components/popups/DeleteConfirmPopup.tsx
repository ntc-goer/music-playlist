import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useDeleteMusicTrack } from "../../http/music/hook";

interface PropsI {
  songId: string;
  onClose: CallableFunction;
  refetchList: CallableFunction
  message?: string;
}

function DeleteConfirmPopup({
  onClose,
  message,
  refetchList,
  songId,
}: PropsI) {
  const deleteMusicTrack = useDeleteMusicTrack({onClose, refetchList});
  const handleDeleteSong = () => {
    deleteMusicTrack.mutate(songId);
  };
  return (
    <Dialog
      open={Boolean(songId)}
      onClose={() => onClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete music</DialogTitle>
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
