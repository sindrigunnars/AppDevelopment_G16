import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    searchContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        marginVertical: 16

    },
    searchBar__unclicked: {
        padding: 10,
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center'
    },
    searchBar__clicked: {
        padding: 10,
        flexDirection: 'row',
        width: '80%',
        backgroundColor: '#d9dbda',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    searchInput: {
        fontSize: 20,
        marginLeft: 10,
        width: '90%'
    }
});
