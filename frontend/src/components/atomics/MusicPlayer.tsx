import { Box, Button, Slider, Stack } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatMusicTime, getFullUrl } from "../../ultis/common";
import defaultImage from "./../../assets/images/default_image.png"

interface PropsI {
  id: string;
  url: string;
  thumbnailUrl?: string;
  songName: string;
  artist: string;
  playlist?: string
  disableNext: boolean;
  disableBefore: boolean;
  isSongPlaying: boolean;
  setSongPlaying: CallableFunction;
  onChangeSong: CallableFunction;
  onEndSong?: CallableFunction
}

function MusicPlayer({
  url,
  thumbnailUrl,
  songName,
  artist,
  playlist,
  disableNext,
  disableBefore,
  isSongPlaying,
  setSongPlaying,
  onChangeSong,
  onEndSong
}: PropsI) {
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const viewCurrentTime = useMemo(() => {
    return formatMusicTime(currentTime);
  }, [currentTime]);

  const viewDuration = useMemo(() => {
    return formatMusicTime(duration);
  }, [duration]);

  useEffect(() => {
    if (audioRef.current) {
      // Update duration when metadata is loaded
      audioRef.current.onloadedmetadata = () => {
        const d = audioRef.current?.duration ?? 0;
        setDuration(Math.ceil(d));
      };

      const updateCurrentTime = () => {
        if (audioRef.current) {
          const curTime = Math.ceil(audioRef.current.currentTime)
          const dur = Math.ceil(audioRef.current?.duration ?? 0)
          setCurrentTime(curTime);
          if (curTime === dur) {
            onEndSong && onEndSong()
            setSongPlaying(false);
            audioRef.current.currentTime = 0;
          }
        }
      };

      audioRef.current.ontimeupdate = updateCurrentTime;
      handlePlay();
    }
  }, [url]);

  useEffect(() => {
    isSongPlaying ? audioRef.current?.play() : audioRef.current?.pause();
  }, [isSongPlaying]);

  const handlePlay = () => {
    setSongPlaying(true);
    audioRef.current?.play();
  };

  const handlePause = () => {
    setSongPlaying(false);
    audioRef.current?.pause();
  };

  const togglePlayMusic = () => {
    isSongPlaying ? handlePause() : handlePlay();
  };

  const handleChangeSlider = (_event: Event, newValue: number | number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        typeof newValue == "number" ? newValue : newValue[0];
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const handleNextSong = () => {
    onChangeSong("after");
  };

  const handleBeforeSong = () => {
    onChangeSong("before");
  };
  return (
    <Box
      sx={{
        maxHeight: "240px",
        margin: "auto",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
      }}
    >
      <audio
        ref={audioRef}
        src={getFullUrl(url)}
        controls
        style={{ display: "none" }}
      />
      <Stack
        direction={"row"}
        alignItems={"center"}
        sx={{
          backgroundColor: "#F8FAFC",
          borderBottom: "1px solid",
          borderColor: "slategray",
          padding: "10px 50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            minWidth: "30%",
          }}
        >
          <img
            src={thumbnailUrl ? getFullUrl(thumbnailUrl): defaultImage}
            alt=""
            width="88"
            height="88"
            style={{ borderRadius: "8px", backgroundColor: "#F8FAFC" }}
            loading="lazy"
          />
          <Box
            sx={{
              minWidth: 0,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              fontWeight: "bold",
            }}
          >
            <p style={{ color: "#00bcd4", fontSize: "14px" }}>
              {playlist}
            </p>
            <h2
              style={{
                color: "slategray",
                fontSize: "14px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {artist}
            </h2>
            <p style={{ color: "#000", fontSize: "18px" }}>{songName}</p>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
          }}
        >
          <Box sx={{ position: "relative" }}>
            <Slider
              step={1}
              max={Math.floor(duration)}
              value={Math.floor(currentTime)}
              min={0}
              onChange={handleChangeSlider}
            />
          </Box>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            sx={{
              fontSize: "14px",
              fontWeight: "500",
              // tabularNums: true,
            }}
          >
            <Box sx={{ color: "#00bcd4" }}>{viewCurrentTime}</Box>
            <Box sx={{ color: "slategray" }}>{viewDuration}</Box>
          </Stack>
          <Box
            sx={{
              backgroundColor: "#F8FAFC",
              color: "slategray",
              borderRadius: "0 0 16px 16px",
              display: "flex",
              alignItems: "center",
              padding: "8px",
            }}
          >
            <Box
              sx={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}
            >
              <Button onClick={() => !disableBefore && handleBeforeSong()}>
                <svg width="24" height="24" fill="none">
                  <path
                    d="m10 12 8-6v12l-8-6Z"
                    fill={disableBefore ? "#808080" : "currentColor"}
                    stroke={disableBefore ? "#808080" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6v12"
                    stroke={disableBefore ? "#808080" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button aria-label="Rewind 10 seconds" onClick={handleRewind}>
                <svg width="24" height="24" fill="none">
                  <path
                    d="M6.492 16.95c2.861 2.733 7.5 2.733 10.362 0 2.861-2.734 2.861-7.166 0-9.9-2.862-2.733-7.501-2.733-10.362 0A7.096 7.096 0 0 0 5.5 8.226"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 5v3.111c0 .491.398.889.889.889H9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Box>
            <Button
              onClick={togglePlayMusic}
              sx={{
                backgroundColor: "white",
                color: "#000",
                borderRadius: "50%",
                minWidth: "50px",
                width: "50px",
                height: "50px",
                border: "2px solid rgba(0,0,0,0.1)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                my: "-8px",
              }}
              aria-label="Pause"
            >
              {isSongPlaying ? (
                <svg width="30" height="32" fill="currentColor">
                  <rect x="6" y="4" width="4" height="24" rx="2" />
                  <rect x="20" y="4" width="4" height="24" rx="2" />
                </svg>
              ) : (
                <svg
                  width="30"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </Button>
            <Box
              sx={{ flex: 1, display: "flex", justifyContent: "space-evenly" }}
            >
              <Button aria-label="Skip 10 seconds" onClick={handleSkip}>
                <svg width="24" height="24" fill="none">
                  <path
                    d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 5v3.111c0 .491-.398.889-.889.889H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button onClick={() => !disableNext && handleNextSong()}>
                <svg width="24" height="24" fill="none">
                  <path
                    d="M14 12 6 6v12l8-6Z"
                    fill={disableNext ? "#808080" : "currentColor"}
                    stroke={disableNext ? "#808080" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 6v12"
                    stroke={disableNext ? "#808080" : "currentColor"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default MusicPlayer;
