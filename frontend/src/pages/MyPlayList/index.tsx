import { Box } from "@mui/material";
import HeaderTools from "./HeaderTool";
import CreatePlaylistPopup from "../../components/popups/CreatePlaylistPopup";
import { useEffect, useState } from "react";
import { useGetPlaylists } from "../../http/playlist/hook";
import PlaylistTable from "./PlaylistTable";

let timeOut: number | undefined
function MyPlayList() {
  
  const [isOpenCreatePlaylist, setIsOpenCreatePlaylist] = useState(false);
  const [addMusicPlaylistId, setAddMusicPlaylistId] = useState("");

  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeSearchKeyword, setActiveSearchKeyword] = useState("")

  const { data, refetch } = useGetPlaylists(1, 10, activeSearchKeyword);
  useEffect(() => {
    if(timeOut){
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      setActiveSearchKeyword(searchKeyword)
    }, 500);
  }, [searchKeyword])
  
  return (
    <Box>
      <HeaderTools
        searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}
        openCreatePlaylistPopup={() => setIsOpenCreatePlaylist(true)}
      />
      <PlaylistTable
        data={data}
        onSelectAddPlaylistIcon={setAddMusicPlaylistId}
      />
      {/* Popup */}
      <CreatePlaylistPopup
        open={isOpenCreatePlaylist}
        refetchList={refetch}
        handleClose={() => setIsOpenCreatePlaylist(false)}
      />
    </Box>
  );
}

export default MyPlayList;
