import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import image1 from "./../../assets/images/1.jpg";
import image2 from "./../../assets/images/2.jpg";
import image3 from "./../../assets/images/3.jpg";
import image4 from "./../../assets/images/4.jpg";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

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
    label: "Edit/Delete",
    minWidth: 170,
  },
];


const rows = [
  {
    id: 1,
    name: "Night Tower",
    thumbnail: image1,
    artist: "HKT",
    album: "Tinh nho",
    genre: "Pop",
    release: "1990",
    duration: "60",
  },
  {
    id: 2,
    name: "Night Tower",
    thumbnail: image2,
    artist: "HKT",
    album: "Tinh nho",
    genre: "Pop",
    release: "1990",
    duration: "60",
  },
  {
    id: 3,
    name: "Night Tower",
    thumbnail: image3,
    artist: "HKT",
    album: "Tinh nho",
    genre: "Pop",
    release: "1990",
    duration: "60",
  },
  {
    id: 4,
    name: "Night Tower",
    thumbnail: image4,
    artist: "HKT",
    album: "Tinh nho",
    genre: "Pop",
    release: "1990",
    duration: "60",
  },
];

export default function MusicTrackTable() {

  const handleDeleteTrack = (id: number) => {
    console.log(id);
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
            {rows.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id}>
                  <TableCell align={"center"}>
                    <Stack direction={"row"} alignItems={"center"}>
                      <img
                        src={row.thumbnail}
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "10px",
                          marginRight: "10px",
                        }}
                      />
                      <Box>
                        <Typography
                          sx={{ fontSize: "17px", fontWeight: "bold" }}
                        >
                          {row.name}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "gray" }}>
                          {row.artist}
                        </Typography>
                      </Box>
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
                      {row.release}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
                    <Typography sx={{ fontSize: "17px" }}>
                      {row.duration}
                    </Typography>
                  </TableCell>
                  <TableCell align={"center"}>
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
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={5}
        page={10}
        onPageChange={() => {}}
        onRowsPerPageChange={() => {}}
      />
    </Paper>
  );
}
