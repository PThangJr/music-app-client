import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import songsAPI from "../../api/songsAPI";
import { setCurrentSong } from "../Player/currentSongSlice";
import { setPrevSongs } from "./prevSongsSlice";

const initialState = {
  data: [],
  isLoading: false,
  message: "",
  errors: null,
};
export const fetchSongsPlayOfAlbum = createAsyncThunk(
  "/songs-play-of-album",
  async (payload, thunkAPI) => {
    try {
      const response = await songsAPI.getSongsOfAlbum(payload);

      // return { ...response, songs: response.songs.slice(1) };
      return response.songs;
    } catch (error) {
      console.log("Fetch Songs has errors: ", error);
    }
  }
);

const songsPlaySlice = createSlice({
  name: "songs-play",
  initialState,
  reducers: {
    randomSongs(state, action) {
      const { isRandom, songId } = action.payload;

      let currentData = [...current(state).data];
      const othersSong = currentData.filter((item) => item._id !== songId);
      const currentSong = currentData.filter((item) => item._id === songId);
      if (isRandom) {
        let randomSongs = othersSong.sort(() => Math.random() - 0.5);
        state.data = [...currentSong, ...randomSongs];
      }
    },
    setSongsPlay(state, action) {
      state.data = action.payload;
    },
    updateSongList(state, action) {
      state.data = action.payload;
    },
    setNextSongs(state, action) {
      state.data.unshift(action.payload);
    },
    removeNextSong(state, action) {
      state.data.shift();
    },
    removeNextSongs(state, action) {
      state.data = [];
    },
  },

  extraReducers: {
    [fetchSongsPlayOfAlbum.pending](state, action) {
      state.isLoading = true;
      state.errors = null;
      state.message = "";
    },
    [fetchSongsPlayOfAlbum.fulfilled](state, action) {
      state.data = action.payload;
      state.isLoading = false;
    },
    [fetchSongsPlayOfAlbum.rejected](state, action) {
      console.log(action.payload);
    },
  },
});

export default songsPlaySlice.reducer;
export const {
  randomSongs,
  updateSongList,
  setNextSongs,
  removeNextSong,
  removeNextSongs,
  setSongsPlay,
} = songsPlaySlice.actions;