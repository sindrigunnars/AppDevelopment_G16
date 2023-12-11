import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../slices/moviesSlice';
import theatersSlice from '../slices/theatersSlice';
import upcomingSlice from '../slices/upcomingSlice';

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
        theaters: theatersSlice,
        upcoming: upcomingSlice
    }
});

export default store;
