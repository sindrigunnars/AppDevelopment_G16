import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    number: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginTop: 20
    },
    callBtn: {
        marginTop: 20
    }
});
