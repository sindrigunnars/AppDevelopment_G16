import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchMovies = createAsyncThunk('fetchMovies', async (token) => {
    const response = await fetch('https://api.kvikmyndir.is/movies', {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const res = await response.json();
    if (res.error) {
        throw new Error(`${res.message}`);
    }
    return res;
});

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            const data = action.payload;
            const sortedData = data ? [...data].sort((movieA, movieB) => movieA.title.localeCompare(movieB.title, 'is', { sensitivity: 'base' })) : null;
            state.data = sortedData;
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    }
});

export default moviesSlice.reducer;
