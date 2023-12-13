import { Text, Image, View, StyleSheet, ScrollView } from "react-native";
import PropTypes from 'prop-types';
import Showtimes from '../../components/Showtimes';

const MovieDetail = ({ route, navigation: { navigate } }) => {
    const data = route.params;
    const { id, title, poster, year, genres, durationMinutes, plot, showtimes, theatreId } = data;

    let theatreShowtimes;
    let theatre;
    if (theatreId) {
        theatre = showtimes.find(showtime => showtime.cinema.id === theatreId);
        if (theatre) {
            theatreShowtimes = theatre.schedule;
        }
    }


    return (
        <View style={{ flex: 1, height: "100%" }}>
            <ScrollView>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: poster }} />
                    {typeof (genres[0]) != 'number' ?
                        (<View style={styles.genres}>
                            {genres.map((genre, key) =>
                                <View style={styles.genre} key={key}><Text>{genre["NameEN\t"] ? genre["NameEN\t"] : genre["Name"]}</Text></View>)}
                        </View>) : null}
                    <View style={styles.info}>
                        <Text>{year} • {durationMinutes}min</Text>
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.plot}>{plot}</Text>
                    {/* Divider */}
                    {theatreShowtimes ? <View style={styles.divider} /> : null}
                    {theatreShowtimes ? <Showtimes times={theatreShowtimes} theatre={theatre.cinema.name} /> : null}
                </View>
            </ScrollView>
        </View>
    )

};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'contain',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        paddingTop: 10,
    },
    movieContainer: {
        width: '70%',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: "600",
        marginVertical: 10,
        width: '90%',
        textAlign: 'center',
    },
    genres: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    genre: {
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 20,
        padding: 8,
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 10,
    },
    plot: {
        width: '75%',
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 20,
        width: '90%',
    }
});

MovieDetail.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired
    }).isRequired,
    route: PropTypes.object.isRequired
};

export default MovieDetail;