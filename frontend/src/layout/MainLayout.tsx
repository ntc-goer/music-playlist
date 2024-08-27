import { Outlet } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SideBar from "../components/parts/Sidebar";
import Header from "../components/parts/Header";
import { Box } from "@mui/material";

function MainLayout() {
  const SIDEBAR_WIDTH = 200;
  return (
    <Grid container spacing={2}>
      <Grid item sx={{ width: SIDEBAR_WIDTH }}>
        <SideBar width={SIDEBAR_WIDTH} />
      </Grid>

      <Grid item xs>
        <Box sx={{ padding: "20px 80px" }}>
          <Header />
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default MainLayout;
