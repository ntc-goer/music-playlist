import { Box } from "@mui/material";
import HeaderTools from "./HeaderTools";
import MusicTrackTable from "./MusicTrackTable";
import { useEffect, useMemo, useState } from "react";
import {
  AddMusicTrackPopup,
  DeleteConfirmPopup,
} from "../../components/popups";
import { useGetMusicTracks } from "../../http/music/hook";
import MusicPlayer from "../../components/atomics/MusicPlayer";
import { MusicTrack } from "../../models/music";
import AddMusicToPlaylistPopup from "../../components/popups/AddMusicToPlaylistPopup";

let timeOut: number | undefined;
function MyPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeSearchKeyword, setActiveSearchKeyword] = useState("");

  const { data, refetch } = useGetMusicTracks(1, 10, activeSearchKeyword);

  const [selectedSongId, setSelectedSongId] = useState("");
  const [isSelectedSongPlaying, setIsSelectedSongPlaying] = useState(false);

  const [selectedDeletedSongId, setSelectedDeleteSongId] = useState("");
  const [isAddMusicTrackOpen, setIsAddMusicTrackOpen] = useState(false);

  const [addPlaylistMusicId, setAddPlaylistMusicId] = useState("");

  useEffect(() => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      setActiveSearchKeyword(searchKeyword);
    }, 500);
  }, [searchKeyword]);

  const selectedSong = useMemo(() => {
    const song = data?.find((item: MusicTrack) => item.id === selectedSongId);
    if (song && song) {
      return song;
    }
    return null;
  }, [selectedSongId]);

  const onChangeSong = (direction: "before" | "after") => {
    if (data) {
      const currentIndex = data.findIndex(
        (item: MusicTrack) => item.id === selectedSongId
      );
      if (
        (currentIndex == 0 && direction == "before") ||
        (currentIndex == data.length - 1 && direction == "after")
      ) {
        return;
      }
      if (direction == "before") {
        setSelectedSongId(data[currentIndex - 1].id);
      } else {
        setSelectedSongId(data[currentIndex + 1].id);
      }
    }
  };

  const disableNext = useMemo(() => {
    if(!data) return false
    const currentIndex = data.findIndex(
      (item: MusicTrack) => item.id === selectedSongId
    );
    return currentIndex === data.length - 1;
  }, [selectedSongId]);

  const disableBefore = useMemo(() => {
    if(!data) return false
    const currentIndex = data.findIndex(
      (item: MusicTrack) => item.id === selectedSongId
    );
    return currentIndex === 0;
  }, [selectedSongId]);
  return (
    <Box>
      <HeaderTools
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        openAddMusicTrackPopup={setIsAddMusicTrackOpen}
      />
      <MusicTrackTable
        data={data}
        selectedSongId={selectedSongId}
        isSongPlaying={isSelectedSongPlaying}
        onPauseSong={() => setIsSelectedSongPlaying(false)}
        onPlaySong={(id: string) => {
          setSelectedSongId(id);
          setIsSelectedSongPlaying(true);
        }}
        onAddMusicPlaylist={setAddPlaylistMusicId}
        onOpenDeletePopup={(id: string) => setSelectedDeleteSongId(id)}
      />
      <AddMusicTrackPopup
        open={isAddMusicTrackOpen}
        handleClose={() => {
          setIsAddMusicTrackOpen(false);
        }}
        refetchList={refetch}
      />
      {selectedSong && (
        <MusicPlayer
          id={selectedSong.id}
          url={selectedSong.songFileName}
          onChangeSong={onChangeSong}
          isSongPlaying={isSelectedSongPlaying}
          setSongPlaying={setIsSelectedSongPlaying}
          thumbnailUrl={selectedSong.thumbnailName}
          songName={selectedSong.name}
          disableNext={disableNext}
          disableBefore={disableBefore}
          artist={selectedSong.artist}
        />
      )}
      <AddMusicToPlaylistPopup
        open={Boolean(addPlaylistMusicId)}
        musicId={addPlaylistMusicId}
        refetchList={() => refetch()}
        handleClose={() => setAddPlaylistMusicId("")}
      />
      <DeleteConfirmPopup
        songId={selectedDeletedSongId}
        refetchList={refetch}
        onClose={() => setSelectedDeleteSongId("")}
      />
    </Box>
  );
}

export default MyPage;
