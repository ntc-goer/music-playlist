import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface PropsI {
    open:  boolean
    handleClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void
}

function DeleteConfirmPopup({open, handleClose}: PropsI) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Use Google's location service?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button>Disagree</Button>
        <Button autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmPopup;
