import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
