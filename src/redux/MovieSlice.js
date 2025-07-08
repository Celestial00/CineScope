import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

const MoviesApi = createAsyncThunk("mov/fetchall", async () => {
  try {
    const results = [];

    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=b7fe2c24f174676b490b42de62837330&page=${page}`
      );
      const data = await res.json();
      results.push(...data.results);
    }

    return results.slice(0, 50); // Optional: only take top 50
  } catch (err) {
    throw new Error(err.message);
  }
});
const initialState = {
  movies: [],
  wishlist: [],
  loading: false,
  err: null,
};

const MovieSlice = createSlice({
  name: "movies",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(MoviesApi.pending, (state, action) => {
      state.loading = true;
      state.err = null;
    });

    builder.addCase(MoviesApi.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.loading = false;
    });
    builder.addCase(MoviesApi.rejected, (state, action) => {
      state.err = action.error.message;
      state.loading = false;
    });
  },
});

export const { getMovies } = MovieSlice.actions;
export const MoviesState = MovieSlice.reducer;
export { MoviesApi };
