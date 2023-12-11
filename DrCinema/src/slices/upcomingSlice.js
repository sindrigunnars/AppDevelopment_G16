import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchUpcoming = createAsyncThunk('fetchUpcoming', async () => {
    const response = await fetch('https://api.kvikmyndir.is/upcoming', {
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

const upcomingSlice = createSlice({
    name: 'upcoming',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUpcoming.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchUpcoming.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUpcoming.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    }
});

export default upcomingSlice.reducer;
