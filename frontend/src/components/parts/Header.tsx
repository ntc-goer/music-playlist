import { Avatar, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

function Header() {
  return (
    <Stack direction={'row'} justifyContent={'end'}>
      <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
    </Stack>
  );
}

export default Header;
