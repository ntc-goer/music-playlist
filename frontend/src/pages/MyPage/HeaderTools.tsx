import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

interface PropsI {
    openAddMusicTrackPopup: CallableFunction
}
function HeaderTools({openAddMusicTrackPopup}: PropsI) {
  const handleAddMusicTrack = () => {
    openAddMusicTrackPopup(true)
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{ mt: "20px" }}
    >
      <Box sx={{ fontSize: 30, fontWeight: "bold" }}>My Library</Box>
      <Box>
        <TextField
          variant="outlined"
          size="small"
          sx={{
            "& .MuiOutlinedInput-input": {
              fontSize: 15,
            },
            "& .MuiSvgIcon-fontSizeMedium": {
              fontSize: 20,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: 25,
              "&:hover fieldset": {
                borderColor: "#FCCCFF", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FCCCFF", // Border color when focused
              },
            },
          }}
          placeholder="Search music"
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
            backgroundColor: "#FCCCFF",
            color: "black",
            borderRadius: "15px",
            fontSize: 14,
            boxShadow: "none",
            padding: "5px 15px",
            verticalAlign: "center",
            "&:hover": {
              backgroundColor: "#f5b0f9",
              boxShadow: "none",
            },
          }}
          onClick={handleAddMusicTrack}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <AddOutlinedIcon sx={{ fontSize: 15 }} />
            <Box>Upload Music</Box>
          </Stack>
        </Button>
      </Box>
    </Stack>
  );
}

export default HeaderTools;
