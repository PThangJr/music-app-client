import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import searchAPI from "../../api/searchAPI";

const initialState = {
  isLoading: false,
  data: {
    songs: [],
    singers: [],
    albums: [],
    songsOfSingers: [],
  },
  isSuccess: null,
};
export const fetchResults = createAsyncThunk(
  "/results",
  async (payload, thunkAPI) => {
    try {
      const response = await searchAPI.getSearch(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchResults.pending](state, action) {
      console.log("pending...");
      state.isLoading = true;
      state.isSuccess = null;
    },
    [fetchResults.fulfilled](state, action) {
      state.data = action.payload.search;
      state.isLoading = false;
      state.isSuccess = true;
    },
    [fetchResults.pending](state, action) {
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
});
export default resultsSlice.reducer;
