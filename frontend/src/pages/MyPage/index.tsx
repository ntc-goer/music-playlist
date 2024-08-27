import { Box } from "@mui/material";
import HeaderTools from "./HeaderTools";
import MusicTrackTable from "./MusicTrackTable";
import { useState } from "react";
import { AddMusicTrackPopup } from "../../components/popups";

function MyPage() {
  const [isAddMusicTrackOpen, setIsAddMusicTrackOpen] = useState(false);
  return (
    <Box>
      <HeaderTools openAddMusicTrackPopup={setIsAddMusicTrackOpen} />
      <MusicTrackTable />
      <AddMusicTrackPopup
        open={isAddMusicTrackOpen}
        handleClose={() => {
          setIsAddMusicTrackOpen(false);
        }}
      />
      {/* <DeleteConfirmPopup open={}/> */}
    </Box>
  );
}

export default MyPage;
