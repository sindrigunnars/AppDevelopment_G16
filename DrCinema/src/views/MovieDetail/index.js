import React from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Showtimes from '../../components/Showtimes';
import MultipleTheatresShowtimes from '../../components/MultipleTheatresShowtimes';

const MovieDetail = ({ route, navigation: { navigate } }) => {
    const data = route.params;
    const { title, poster, year, genres, durationMinutes, plot, showtimes, theatreId } = data;

    // movie details when clicked on 'all movies' screen
    const allShowtimesByTheatre = {};
    let theatres = [];
    // movie details when clicked on 'theatre' screen
    let theatreShowtimes;
    let theatre;

    if (theatreId) {
        theatre = showtimes.find(showtime => showtime.cinema.id === theatreId);
        if (theatre) {
            theatreShowtimes = theatre.schedule;
        }
    } else {
        theatres = showtimes.map((showtime) => showtime.cinema.name);

        showtimes.forEach(showtime => {
            const name = showtime.cinema.name;

            if (!allShowtimesByTheatre[name]) {
                // schedule for that theatre
                theatre = showtimes.find(showtime => showtime.cinema.name === name);
                theatreShowtimes = theatre.schedule;
                allShowtimesByTheatre[name] = {
                    showtimes: theatreShowtimes
                };
            }
        });
        theatreShowtimes = null; // there was an issue with the component for this rendering as well
    }

    return (
        <View style={{ flex: 1, height: '100%', backgroundColor: '#f9f9f9' }}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: poster }} />
                    {typeof (genres[0]) !== 'number'
                        ? (<View style={styles.genres}>
                            {genres.map((genre, key) =>
                                <View style={styles.genre} key={key}><Text>{genre['NameEN\t'] ? genre['NameEN\t'] : genre.Name}</Text></View>)}
                        </View>)
                        : null}
                    <View style={styles.info}>
                        <Text>{year} • {durationMinutes}min</Text>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.plot}>{plot}</Text>
                    {theatreShowtimes ? <View style={styles.divider} /> : null}
                    {theatreShowtimes ? <Showtimes times={theatreShowtimes} theatre={theatre.cinema.name} /> : null}
                    {allShowtimesByTheatre ? <View style={styles.divider} /> : null}
                    {allShowtimesByTheatre
                        ? (
                            <View>
                                <MultipleTheatresShowtimes times={allShowtimesByTheatre} theatres={theatres} />
                            </View>
                        )
                        : null
                    }
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingTop: 10
    },
    movieContainer: {
        width: '70%',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        marginVertical: 10,
        width: '90%',
        textAlign: 'center'
    },
    genres: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8
    },
    genre: {
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 20,
        padding: 8
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 10
    },
    plot: {
        width: '75%',
        textAlign: 'justify'
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 20,
        width: '90%'
    }
});

MovieDetail.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default MovieDetail;
