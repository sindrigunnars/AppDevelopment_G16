import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonOpen: {
        backgroundColor: '#f23006'
    },
    buttonClose: {
        backgroundColor: '#80ff80',
        width: '100%'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    },
    item: {
        flex: 1,
        flexDirection: 'column',
        minWidth: '90%',
        alignItems: 'center'
    },
    input: {
        marginBottom: 16,
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white'
    },
    buttonMain: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2f73',
        padding: 10,
        width: '100%',
        height: 45,
        borderRadius: 8,
        marginBottom: 16
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1b2f73',
        padding: 15,
        width: '100%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    photoButtons: {
        flexGrow: 1,
        flexDirection: 'row',
        width: '100%',
        marginBottom: 16
    },
    divider: {
        width: 1,
        backgroundColor: 'white'
    }
});
