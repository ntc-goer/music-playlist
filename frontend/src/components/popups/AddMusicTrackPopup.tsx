import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Select,
  MenuItem,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import InputFile from "../atomics/InputFile";
import { useState } from "react";
import ImageUpload from "../atomics/ImageUpload";
import InputField from "../atomics/InputField";
import InputRow from "../parts/InputRow";
import { getFormDataFromJSON } from "../../ultis/common";
import { useCreateMusicTrack } from "../../http/hook";

interface PropsI {
  open: boolean;
  handleClose?: (event: {}, reason: "backdropClick" | "escapeKeyDown") => void;
}

const GENRE_DATA = [
  { value: "pop", label: "Pop" },
  { value: "rock", label: "Rock" },
  { value: "jazz", label: "Jazz" },
  { value: "classical", label: "Classical" },
  { value: "hip-hop", label: "Hip-Hop" },
  { value: "country", label: "Country" },
  { value: "electronic", label: "Electronic" },
  { value: "reggae", label: "Reggae" },
  { value: "blues", label: "Blues" },
  { value: "folk", label: "Folk" },
  { value: "metal", label: "Metal" },
  { value: "soul", label: "Soul" },
  { value: "rnb", label: "R&B" },
  { value: "indie", label: "Indie" },
  { value: "punk", label: "Punk" },
];
function AddMusicTrackPopup({ open, handleClose }: PropsI) {
  const [musicTrack, setMusicTrack] = useState<{
    name: string;
    album: string;
    artist: string;
    file: File | null;
    thumbnail: File | null;
    genre: string;
    releaseYear: number;
    duration: number;
  }>({
    name: "",
    album: "",
    artist: "",
    file: null,
    thumbnail: null,
    genre: GENRE_DATA[0].value,
    releaseYear: new Date().getFullYear(),
    duration: 0,
  });

  const createMusicTrack = useCreateMusicTrack();
  const handleAddMusicFile = (file: File) => {
    setMusicTrack({ ...musicTrack, file });
  };

  const handleCreateMusicTrack = () => {
    const formData = getFormDataFromJSON(musicTrack);
    createMusicTrack.mutate({
      formData,
    });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "10px" }}
    >
      <DialogTitle id="alert-dialog-title">{"Add music track"}</DialogTitle>
      <DialogContent>
        <Grid container>
          <InputRow label="Name">
            <InputField
              value={musicTrack.name}
              onChange={(name: string) =>
                setMusicTrack({ ...musicTrack, name })
              }
              placeholder="Song..."
            />
          </InputRow>
          <InputRow label="Album">
            <InputField
              value={musicTrack.album}
              onChange={(album: string) =>
                setMusicTrack({ ...musicTrack, album })
              }
            />
          </InputRow>
          <InputRow label="Artist">
            <InputField
              value={musicTrack.artist}
              onChange={(artist: string) =>
                setMusicTrack({ ...musicTrack, artist })
              }
            />
          </InputRow>
          <InputRow label="Genre">
            <Select
              sx={{width: "100%"}}
              value={musicTrack.genre}
              onChange={(e) =>
                setMusicTrack({ ...musicTrack, genre: e.target.value })
              }
            >
              {GENRE_DATA.map((genre) => (
                <MenuItem key={genre.value} value={genre.value}>
                  {genre.label}
                </MenuItem>
              ))}
            </Select>
          </InputRow>

          <InputRow label="Thumbnail">
            <ImageUpload
              onChange={(file: File) =>
                setMusicTrack({ ...musicTrack, thumbnail: file })
              }
              value={musicTrack.thumbnail}
            />
          </InputRow>

          <InputRow label="Select file">
            {!musicTrack.file && (
              <InputFile
                isShowFileName={true}
                onChange={handleAddMusicFile}
                accept=".mp3"
              />
            )}
            {musicTrack.file && (
              <Stack flexDirection={"row"} alignItems={"center"}>
                <Typography sx={{ fontSize: "14px", mr: "7px" }}>
                  {musicTrack.file.name}
                </Typography>
                <InputFile
                  isShowFileName={true}
                  onChange={handleAddMusicFile}
                  accept=".mp3"
                />
              </Stack>
            )}
          </InputRow>

          <InputRow label="Release Year">
            <InputField
              type="number"
              value={musicTrack.releaseYear}
              onChange={(val: string) =>
                setMusicTrack({
                  ...musicTrack,
                  releaseYear: parseInt(val),
                })
              }
            />
          </InputRow>

          <InputRow label="Duration (second)">
            <InputField
              type="number"
              value={musicTrack.duration}
              onChange={(val: string) =>
                setMusicTrack({
                  ...musicTrack,
                  duration: parseInt(val),
                })
              }
            />
          </InputRow>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          autoFocus
          variant="contained"
          sx={{ padding: "10px 50px" }}
          onClick={handleCreateMusicTrack}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddMusicTrackPopup;
