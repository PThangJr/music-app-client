import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Card from "../../../../components/Card";
import SongsList from "../../../../components/SongsList";
import { fetchAlbumsOfSinger } from "../../../Albums/albumsSlice";
import { fetchSongsOfSinger } from "../../../Songs/songsSlice";

const SingerDetail = (props) => {
  const dispatch = useDispatch();
  const { singerSlug } = useParams();
  useEffect(() => {
    dispatch(fetchSongsOfSinger({ singerSlug }));
    dispatch(fetchAlbumsOfSinger({ singerSlug }));
  }, [dispatch, singerSlug]);
  const songs = useSelector((state) => state.songs);

  const albums = useSelector((state) => state.albums);
  const albumsData = albums.data;

  return (
    <div className="albums">
      <div className="row">
        <div className="col-xl-9 col-lg-9 col-md-12 col-12">
          <h3 className="albums__heading heading-15">Bài hát</h3>
          <SongsList songs={songs.data} isLoading={songs.isLoading} fullInfo />
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-12">
          <h3 className="heading-15">Albums</h3>
          <div className="row">
            {albumsData.map((album) => {
              return (
                <div
                  key={album._id}
                  className="col-xl-6 col-lg-6 col-md-3 col-sm-4 col-6"
                >
                  <Card
                    linkImage={album.linkImage}
                    title={album.name}
                    descriptions={album.singers}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

SingerDetail.propTypes = {};

export default SingerDetail;