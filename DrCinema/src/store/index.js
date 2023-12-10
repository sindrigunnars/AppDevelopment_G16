import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../slices/moviesSlice';

export const store = configureStore({
    reducer: {
        movies: moviesSlice
    }
});

export default store;
