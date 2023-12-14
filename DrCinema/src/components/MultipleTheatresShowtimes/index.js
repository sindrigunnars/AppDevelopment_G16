import React from 'react';
import { View, Text, Button, Linking } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const MultipleTheatresShowtimes = ({ theatres, times }) => {
    // console.log(' hey ' + times[theatre].showtimes[0].time); works in the views
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tickets</Text>
            { /* iterating over stuff */ }
            <View style={styles.theatreContainer}>
                {theatres.map((theatre, index) => (
                    <View key={index}>
                        <Text>{theatre}</Text>
                        <View>
                            {(times[theatre].showtimes).map((time, key) =>
                                <Button key={key} title={time.time} style={styles.ticketBtn} onPress={() => Linking.openURL(time.purchase_url)} />)}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

MultipleTheatresShowtimes.propTypes = {
    theatres: PropTypes.arrayOf(PropTypes.string).isRequired,
    times: PropTypes.objectOf(
        PropTypes.shape({
            showtimes: PropTypes.array.isRequired
        })
    ).isRequired
};

export default MultipleTheatresShowtimes;
