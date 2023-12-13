import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        marginVertical: 8,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
    },
    theatre: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
    timesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 20,
        width: '70%',
    },
    theatreContainer: {
        flex: 1,
        alignItems: 'center',
    },
    ticketBtn: {
        backgroundColor: '#ccc',
        margin: 5,
        borderWidth: 1,
    }
});