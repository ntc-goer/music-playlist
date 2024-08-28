import { Box, Stack } from "@mui/material";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import { useNavigate, useRoutes } from "react-router-dom";

const SideBarItem = [
  {
    label: "My Music",
    icon: FolderOpenIcon,
    href: "/",
  },
  {
    label: "My Playlist",
    icon: PlaylistPlayIcon,
    href: "/playlist",
  },
];
function SideBar({ width }: { width: number }) {
  const navigate = useNavigate();
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
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: 25,
          mb: "20px",
          textAlign: "center",
        }}
      >
        EMVN
      </Box>
      {SideBarItem.map(({ label, icon: Icon, href }) => {
        return (
          <Stack
            key={label}
            direction="row"
            justifyContent="start"
            alignItems="center"
            sx={{ cursor: "pointer", mb: "10px" }}
            onClick={() => navigate(href)}
          >
            <Icon sx={{ mr: "5px", fontSize: "18px" }} />
            <Box>{label}</Box>
          </Stack>
        );
      })}
    </Box>
  );
}

export default SideBar;
