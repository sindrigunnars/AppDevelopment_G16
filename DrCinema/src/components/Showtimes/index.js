import { View, Text, Linking, Button } from "react-native";
import styles from "./styles";

const Showtimes = ({ theatre, times }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tickets</Text>
            <View style={styles.theatreContainer}>
                <Text style={styles.theatre}>{theatre}</Text>
                <View style={styles.timesContainer}>
                    {times.map((time, key) =>
                        <Button key={key} title={time.time} style={styles.ticketBtn} onPress={() => Linking.openURL(time.purchase_url)} />)}
                </View>
            </View>
        </View>
    )
};

export default Showtimes;