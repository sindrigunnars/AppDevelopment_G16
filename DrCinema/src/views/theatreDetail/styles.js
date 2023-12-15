import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    details: {
        marginTop: 20,
        rowGap: 20,
        marginHorizontal: 10,
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 10,
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        fontSize: 20
    }
});
