import { Box } from "@mui/material";
import HeaderTools from "./HeaderTool";
import CreatePlaylistPopup from "../../components/popups/CreatePlaylistPopup";
import { useContext, useEffect, useMemo, useState } from "react";
import { useGetPlaylists } from "../../http/playlist/hook";
import PlaylistTable from "./PlaylistTable";
import {
  DeleteConfirmPopup,
  ShowPlaylistItemPopup,
} from "../../components/popups";
import { Playlist } from "../../models/playlist";
import { NotificationContext } from "../../components/parts/Notification";
import { useGetMusicById } from "../../http/music/hook";
import MusicPlayer from "../../components/atomics/MusicPlayer";

let timeOut: number | undefined;
function MyPlayList() {
  const [isOpenCreatePlaylist, setIsOpenCreatePlaylist] = useState(false);
  const [showPlaylistItemId, setShowPlaylistItemId] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeSearchKeyword, setActiveSearchKeyword] = useState("");

  const [editPlaylist, setEditPlaylist] = useState<Playlist | null>(null);

  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(
    null
  );
  const [selectedSongId, setSelectedSongId] = useState("");
  const [isSelectedSongPlaying, setIsSelectedSongPlaying] = useState(false);
  const [selectedDeletedPlaylistId, setSelectedDeletePlaylistId] = useState("");

  const { data, refetch } = useGetPlaylists(1, 10, activeSearchKeyword);

  useEffect(() => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      setActiveSearchKeyword(searchKeyword);
    }, 500);
  }, [searchKeyword]);

  const { data: musicData } = useGetMusicById(selectedSongId);
  const notification = useContext(NotificationContext);

  const onChangeSong = (direction: "before" | "after") => {
    if (
      data &&
      selectedPlaylist?.songList &&
      selectedPlaylist?.songList.length > 0
    ) {
      const index = selectedPlaylist?.songList.findIndex(
        (item: string) => item === selectedSongId
      );
      if (
        (direction === "after" &&
          index == selectedPlaylist.songList.length - 1) ||
        (direction === "before" && index == 0)
      ) {
        return;
      }
      setSelectedSongId(
        selectedPlaylist?.songList[
          direction == "before" ? index - 1 : index + 1
        ]
      );
    }
  };

  const disableNext = useMemo(() => {
    if (
      data &&
      selectedPlaylist?.songList &&
      selectedPlaylist?.songList.length > 0
    ) {
      const index = selectedPlaylist?.songList.findIndex(
        (item: string) => item === selectedSongId
      );
      return index === selectedPlaylist?.songList.length - 1;
    }
    return true;
  }, [selectedSongId]);

  const disableBefore = useMemo(() => {
    if (
      data &&
      selectedPlaylist?.songList &&
      selectedPlaylist?.songList.length > 0
    ) {
      const index = selectedPlaylist?.songList.findIndex(
        (item: string) => item === selectedSongId
      );
      return index === 0;
    }
    return true;
  }, [selectedSongId]);

  const handlePlayPlaylist = (playlistId: string) => {
    const playlist = data.find((item: Playlist) => item.id === playlistId);
    if (!playlist) return;
    if (!playlist.songList || playlist.songList.length == 0) {
      notification?.setErrorMsg("Playlist Empty");
      return;
    }
    setSelectedPlaylist(playlist);
    setSelectedSongId(playlist.songList[0]);
    setIsSelectedSongPlaying(true);
  };
  return (
    <Box>
      <HeaderTools
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        openCreatePlaylistPopup={() => setIsOpenCreatePlaylist(true)}
      />
      <PlaylistTable
        data={data}
        selectedPlaylistId={selectedPlaylist?.id}
        isSongPlaying={isSelectedSongPlaying}
        onPausePlaylist={() => setIsSelectedSongPlaying(false)}
        onPlayPlaylist={handlePlayPlaylist}
        onEditPlaylist={(row: Playlist) => {
          setEditPlaylist(row);
          setIsOpenCreatePlaylist(true);
        }}
        onOpenDeletePopup={(id: string) => setSelectedDeletePlaylistId(id)}
        onSelectShowItems={setShowPlaylistItemId}
      />
      {musicData && (
        <MusicPlayer
          id={musicData.id}
          playlist={selectedPlaylist?.name}
          url={musicData.songFileName}
          onChangeSong={onChangeSong}
          isSongPlaying={isSelectedSongPlaying}
          setSongPlaying={setIsSelectedSongPlaying}
          thumbnailUrl={selectedPlaylist?.thumbnailPath}
          songName={musicData.name}
          disableNext={disableNext}
          disableBefore={disableBefore}
          artist={musicData.artist}
          onEndSong={() => onChangeSong("after")}
        />
      )}
      {/* Popup */}
      <CreatePlaylistPopup
        open={isOpenCreatePlaylist}
        editPlaylistItem={editPlaylist}
        refetchList={refetch}
        handleClose={() => {
          setIsOpenCreatePlaylist(false);
          setEditPlaylist(null);
        }}
      />
      <ShowPlaylistItemPopup
        open={Boolean(showPlaylistItemId)}
        playlistId={showPlaylistItemId}
        onClose={() => setShowPlaylistItemId("")}
      />
      <DeleteConfirmPopup
        playlistId={selectedDeletedPlaylistId}
        refetchList={refetch}
        onClose={() => setSelectedDeletePlaylistId("")}
      />
    </Box>
  );
}

export default MyPlayList;
