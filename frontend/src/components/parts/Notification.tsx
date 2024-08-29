import { Alert, AlertTitle } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { createContext, ReactNode, useState } from "react";

interface NotificationContextType {
  errorMsg: string;
  setErrorMsg: (msg: string) => void;
  successMsg: string;
  setSuccessMsg: (msg: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

function Notification({ children }: { children: ReactNode }) {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => {
    setSuccessMsg("");
    setErrorMsg("");
  };

  return (
    <NotificationContext.Provider
      value={{ errorMsg, setErrorMsg, successMsg, setSuccessMsg }}
    >
      {children}
      {successMsg && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(successMsg || errorMsg)}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            {successMsg}
          </Alert>
        </Snackbar>
      )}

      {errorMsg && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(successMsg || errorMsg)}
          onClose={handleClose}
          autoHideDuration={2000}
        >
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {errorMsg}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  );
}

export { Notification as default, NotificationContext };
