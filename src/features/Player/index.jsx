import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PlayerControls from "./components/PlayerControls";
import { setIndexSong } from "./indexSongSlice";
import { fetchSongs } from "./songsSlice";
import "./styles.scss";
const Player = () => {
  const dispatch = useDispatch();
  const indexSong = useSelector((state) => state.indexSong);
  const { indexCurrentSong } = indexSong;
  const playerControls = useSelector((state) => state.playerControls);
  const songs = useSelector((state) => state.songs);
  const songsPlay = useSelector((state) => state.songsPlay);
  const currentSong = useSelector((state) => state.currentSong);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);
  useEffect(() => {
    if (songsPlay.data.length) {
      dispatch(
        setIndexSong({
          ...JSON.parse(localStorage.getItem("currentSong")),
        })
      );
    }
  }, [dispatch, songs.data, songsPlay.data.length]);
  const handleProgressSong = (value) => {
    setProgress(value);
  };
  return (
    <div className="player">
      <div className="container-md player">
        <div className="player-content">
          <div className="player-image">
            <img
              src={
                currentSong?.linkImage ||
                "data:image/jpeg;base64,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"
              }
              alt=""
              className="player-image__img"
            />
          </div>
          <div className="player-info">
            <p className="player-info__name">
              {currentSong.name || "Chọn bài hát"}
            </p>
            <Link to="/" className="player-info__singers">
              {currentSong.singers.map((singer) => {
                return singer.name;
              }) || "Anonymous"}
            </Link>
          </div>
        </div>
        <PlayerControls
          songs={songsPlay.data}
          linkMp3={songsPlay.data[indexCurrentSong]?.linkMp3}
          handleProgressSong={handleProgressSong}
        />
      </div>
    </div>
  );
};

export default Player;
