import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    scrollContainer: {
        marginHorizontal: 20,
        marginTop: 10,
        gap: 10
    },
    button: {
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
