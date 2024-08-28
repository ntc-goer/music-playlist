import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { MusicTrack } from "../../models/music";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { getFullUrl } from "../../ultis/common";
import AddIcon from "@mui/icons-material/Add";

interface Column {
  id: "name" | "album" | "genre" | "release" | "duration" | "action";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "album",
    label: "Album",
    minWidth: 170,
  },
  {
    id: "genre",
    label: "Genre",
    minWidth: 170,
  },
  {
    id: "release",
    label: "Release Year",
    minWidth: 170,
  },
  {
    id: "duration",
    label: "Duration",
    minWidth: 170,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

interface PropsI {
  data?: MusicTrack[];
  selectedSongId: string;
  isSongPlaying: boolean;
  onPlaySong?: CallableFunction;
  onPauseSong?: CallableFunction;
  onOpenDeletePopup?: CallableFunction;
  onAddMusicPlaylist: CallableFunction;
}

export default function MusicTrackTable({
  data,
  selectedSongId,
  isSongPlaying,
  onPlaySong,
  onPauseSong,
  onOpenDeletePopup,
  onAddMusicPlaylist,
}: PropsI) {
  const handleDeleteTrack = (id: string) => {
    onOpenDeletePopup && onOpenDeletePopup(id);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", mt: "30px" }}>
      <TableContainer sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                  align="center"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell align={"center"}>
                    <Stack direction={"row"} alignItems={"center"}>
                      <img
                        src={getFullUrl(row.thumbnailName)}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "10px",
                          marginRight: "10px",
                        }}
                      />
                      <Stack direction={'column'} alignItems={'start'}>
                        <Typography
                          sx={{ fontSize: "17px", fontWeight: "bold" }}
                        >
                          {row.name}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "gray" }}>
                          {row.artist}
                        </Typography>
                      </Stack>
                    </Stack>
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ fontSize: "17px" }}>
                      {row.album}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ fontSize: "17px" }}>
                      {row.genre}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ fontSize: "17px" }}>
                      {row.releaseYear}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ fontSize: "17px" }}>
                      {row.duration}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
                    {selectedSongId === row.id && isSongPlaying ? (
                      <IconButton
                        onClick={() => onPauseSong && onPauseSong(row.id)}
                      >
                        <PauseIcon
                          color="primary"
                          sx={{ fontSize: "25px", cursor: "pointer" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => onPlaySong && onPlaySong(row.id)}
                      >
                        <PlayArrowIcon
                          color="primary"
                          sx={{ fontSize: "25px", cursor: "pointer" }}
                        />
                      </IconButton>
                    )}
                    <Tooltip title="Add To Playlist">
                      <IconButton onClick={() => onAddMusicPlaylist(row.id)}>
                        <AddIcon
                          color="primary"
                          sx={{ fontSize: "25px", cursor: "pointer" }}
                        />
                      </IconButton>
                    </Tooltip>

                    <IconButton>
                      <EditIcon
                        color="primary"
                        sx={{ fontSize: "25px", cursor: "pointer" }}
                      />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTrack(row.id)}>
                      <DeleteIcon
                        color="error"
                        sx={{ fontSize: "25px", ml: "5px", cursor: "pointer" }}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={5}
        page={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      /> */}
    </Paper>
  );
}
