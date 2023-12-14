import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API_USER, API_PASSWORD } from '@env';
import { encode } from 'base-64';

// First, create the thunk
export const fetchAuth = createAsyncThunk('fetchAuth', async () => {
    const encodedAuth = encode(`${API_USER}:${API_PASSWORD}`);
    const response = await fetch('https://api.kvikmyndir.is/authenticate', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedAuth}`
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const res = await response.json();
    return res;
});

const authSlice = createSlice({
    name: 'token',
    initialState: {
        isLoading: false,
        data: '',
        isError: false,
        errorMessage: null
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.errorMessage = null;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload.token;
        });
        builder.addCase(fetchAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    }
});

export default authSlice.reducer;
