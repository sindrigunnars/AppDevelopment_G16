import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchTheaters = createAsyncThunk('fetchTheaters', async (token) => {
    const response = await fetch('https://api.kvikmyndir.is/theaters', {
        method: 'GET',
        headers: {
            'x-access-token': token
        }
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
});

const theatersSlice = createSlice({
    name: 'theaters',
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTheaters.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchTheaters.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchTheaters.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    }
});

export default theatersSlice.reducer;
