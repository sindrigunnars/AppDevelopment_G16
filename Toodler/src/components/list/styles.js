import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    list: {
        borderWidth: 1,
        padding: 10
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    listList: {
        flex: 1,
        flexDirection: 'column',
        gap: 10,
        borderWidth: 1,
        padding: 5
    },
    taskList: {
        flex: 1,
        flexDirection: 'column',
        gap: 10
    },
    buttons: {
        flexShrink: 1,
        flexDirection: 'row'
    },
    button: {
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#f0785a',
        padding: 10,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    taskButton: {
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#1b2f73',
        padding: 10,
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    taskButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    }
});
