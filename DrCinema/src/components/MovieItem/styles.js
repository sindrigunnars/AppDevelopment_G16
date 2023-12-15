import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 10,
        alignItems: 'center',
        height: 100,
        backgroundColor: '#fff',
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
    title: {
        fontSize: 20
    },
    movieDetails: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 10,
        fontSize: 20
    },
    image: {
        width: 70,
        height: '100%'
    }
});
