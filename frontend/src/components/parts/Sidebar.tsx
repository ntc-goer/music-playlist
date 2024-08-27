import { Box, Stack } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
function SideBar({width}: {width: number}) {
  return (
    <Box
      sx={{
        backgroundColor: "#F8F7F3",
        position: "fixed",
        width,
        top: 0,
        left: 0,
        height: "100vh",
        padding: "20px",
        zIndex: 9,
      }}
    >
      <Box sx={{fontWeight: "bold", fontSize: 25, mb: "20px", textAlign: "center"}}>EMVN</Box>
      <Stack direction="row" justifyContent="center" alignItems="center" sx={{cursor: "pointer"}}>
        <FolderOpenIcon sx={{mr: "5px", fontSize: "18px"}}/>
        <Box>My Music</Box>
      </Stack>
    </Box>
  );
}

export default SideBar;
