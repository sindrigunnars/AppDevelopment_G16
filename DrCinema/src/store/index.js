import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from '../slices/moviesSlice';
import theatersSlice from '../slices/theatersSlice';
import upcomingSlice from '../slices/upcomingSlice';
import authSlice from '../slices/authSlice';

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
        theaters: theatersSlice,
        upcoming: upcomingSlice,
        token: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: { warnAfter: 250 },
        serializableCheck: { warnAfter: 250 }
    })
});

export default store;
