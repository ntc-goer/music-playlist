import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Stack, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { getFullUrl } from "../../ultis/common";
import { Playlist } from "../../models/playlist";
import ListIcon from "@mui/icons-material/List";
import defaultImage from "./../../assets/images/default_image.png"

interface Column {
  id: "name" | "thumbnail" | "action";
  label: string;
  minWidth?: number;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "thumbnail",
    label: "Thumbnail",
    minWidth: 170,
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
  },
];

interface PropsI {
  data?: Playlist[];
  isSongPlaying: boolean;
  selectedPlaylistId?: string;
  onPausePlaylist: CallableFunction;
  onPlayPlaylist: CallableFunction;
  onSelectShowItems: CallableFunction;
  onEditPlaylist: CallableFunction;
  onOpenDeletePopup?: CallableFunction;
}

export default function PlaylistTable({
  data,
  isSongPlaying,
  selectedPlaylistId,
  onEditPlaylist,
  onPlayPlaylist,
  onPausePlaylist,
  onSelectShowItems,
  onOpenDeletePopup
}: PropsI) {
  const handleShowList = (id: string) => {
    onSelectShowItems(id);
  };
  const handleDeletePlaylist= (id: string) => {
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
                      <Typography sx={{ fontSize: "17px", fontWeight: "bold" }}>
                        {row.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align={"center"}>
                    <img
                      src={row.thumbnailPath ? getFullUrl(row.thumbnailPath): defaultImage}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "10px",
                        marginRight: "10px",
                      }}
                    />
                  </TableCell>

                  <TableCell align={"center"}>
                    <Tooltip title="Play playlist">
                      {selectedPlaylistId === row.id && isSongPlaying ? (
                        <IconButton onClick={() => onPausePlaylist(row.id)}>
                          <PauseIcon
                            color="primary"
                            sx={{ fontSize: "25px", cursor: "pointer" }}
                          />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => onPlayPlaylist(row.id)}>
                          <PlayArrowIcon
                            color="primary"
                            sx={{ fontSize: "25px", cursor: "pointer" }}
                          />
                        </IconButton>
                      )}
                    </Tooltip>

                    <Tooltip title="Show list">
                      <IconButton onClick={() => handleShowList(row.id)}>
                        <ListIcon
                          color="primary"
                          sx={{ fontSize: "25px", cursor: "pointer" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit playlist">
                      <IconButton onClick={() => onEditPlaylist(row)}>
                        <EditIcon
                          color="primary"
                          sx={{ fontSize: "25px", cursor: "pointer" }}
                        />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete playlist" onClick={() => handleDeletePlaylist(row.id)}>
                      <IconButton>
                        <DeleteIcon
                          color="error"
                          sx={{
                            fontSize: "25px",
                            ml: "5px",
                            cursor: "pointer",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
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
