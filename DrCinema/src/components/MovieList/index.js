import React, { useState, useEffect } from 'react';
import MovieItem from '../MovieItem';
import { View, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../slices/moviesSlice';

const MovieList = ({ theatreId }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token.data);
    const [reload, setReload] = useState(false);
    const { data, isLoading, isError, errorMessage } = useSelector((state) => state.movies);

    useEffect(() => {
        dispatch(fetchMovies(token));
        setReload(false);
    }, [reload]);

    const inTheatre = (movie, theatre) => {
        /* Returns true if the given movie is being shown in the given theatre */
        return movie.showtimes.some(showtime => showtime.cinema.id === theatre);
    };

    if (isError) return <Text>ERROR: {errorMessage}</Text>;

    // Filters movie by theatre, returns all movies if theatreId is undefined
    const movies = data ? [...data].filter(movie => inTheatre(movie, theatreId) || theatreId === undefined) : null;

    return (
        <View>
            {isLoading
                ? <ActivityIndicator size="large" />
                : movies.map((movie, key) => <MovieItem key={key} data={movie} />)}
        </View>
    );
};

MovieList.propTypes = {
    theatreId: PropTypes.number
};

export default MovieList;
