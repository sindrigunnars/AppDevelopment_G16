import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchMovies = createAsyncThunk('fetchMovies', async () => {
    const response = await fetch('https://api.kvikmyndir.is/movies', {
        method: 'GET',
        headers: {
            'x-access-token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY1NzYyOGMyYzQwNzkzMzZiYzAyNTIyZiIsImlhdCI6MTcwMjI0NDgzMywiZXhwIjoxNzAyMzMxMjMzfQ.X0hjrhqqlWM7ldOvGMl53lqzDdDtLvH4wnK2doWgfog'
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
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
            const movies = action.payload;
            state.data = movies.sort((a,b) => {return a.title.localeCompare(b.title)});
        });
        builder.addCase(fetchMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    }
});

export default moviesSlice.reducer;
