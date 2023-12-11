import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// First, create the thunk
export const fetchAuth = createAsyncThunk('fetchAuth', async () => {
    const response = await fetch('https://api.kvikmyndir.is/authenticate', {
        method: 'POST',
        headers: {
            Authorization: 'Basic c2luZHJpZ3VubmFyczpzaW5kcmkwMA=='
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await (response.json()).token;
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
            state.data = action.payload;
        });
        builder.addCase(fetchAuth.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.errorMessage = action.error.message;
        });
    }
});

export default authSlice.reducer;
