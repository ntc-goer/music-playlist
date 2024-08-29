import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface PropsI {
  openCreatePlaylistPopup: CallableFunction;
  searchKeyword: string;
  setSearchKeyword: CallableFunction;
}
function HeaderTools({
  openCreatePlaylistPopup,
  searchKeyword,
  setSearchKeyword,
}: PropsI) {
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ mt: "20px" }}
    >
      <Box sx={{ fontSize: 30, fontWeight: "bold" }}>My Playlist</Box>
      <Box>
        <TextField
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          size="small"
          sx={{
            minWidth: "300px",
            "& .MuiOutlinedInput-input": {
              fontSize: 15,
            },
            "& .MuiSvgIcon-fontSizeMedium": {
              fontSize: 20,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 25,
              "&:hover fieldset": {
                borderColor: "#1976d27d", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d27d", // Border color when focused
              },
            },
          }}
          placeholder="Search by name"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          sx={{
            fontWeight: "bold",
            ml: "20px",
            backgroundColor: "#1976d27d",
            color: "black",
            borderRadius: "15px",
            fontSize: 14,
            boxShadow: "none",
            padding: "5px 15px",
            verticalAlign: "center",
            "&:hover": {
              backgroundColor: "#1976d27d",
              boxShadow: "none",
            },
          }}
          onClick={() => openCreatePlaylistPopup()}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <AddOutlinedIcon sx={{ fontSize: 15 }} />
            <Box>Create playlist</Box>
          </Stack>
        </Button>
      </Box>
    </Stack>
  );
}

export default HeaderTools;
