import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../slices/moviesSlice';
import theatersSlice from '../slices/theatersSlice';

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
        theaters: theatersSlice
    }
});

export default store;
