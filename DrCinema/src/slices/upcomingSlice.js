import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchUpcoming = createAsyncThunk('fetchUpcoming', async (token) => {
    const response = await fetch('https://api.kvikmyndir.is/upcoming', {
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

const compareDate = (a, b) => {
    const dateA = a['release-dateIS'] || 'Release-Date Unknown.';
    const dateB = b['release-dateIS'] || 'Release-Date Unknown.';
    return dateA.localeCompare(dateB, 'is', { sensitivity: 'base' });
};

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
            const data = action.payload;
            const sortedData = [...data].sort(compareDate);
            state.data = sortedData;
        });
        builder.addCase(fetchUpcoming.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    }
});

export default upcomingSlice.reducer;
