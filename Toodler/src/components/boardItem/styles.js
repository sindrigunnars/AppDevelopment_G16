import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    boardContainer: {
        borderColor: 'black',
        borderWidth: 1,
        overflow: 'hidden',
        maxWidth: '90%'
    },
    image: {
        height: 200,
        resizeMode: 'center',
        flexShrink: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    headline: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        textShadowRadius: 5,
        textShadowColor: 'white'
    },
    button: {
        width: '50%',
        flexShrink: 1,
        alignItems: 'center',
        backgroundColor: '#f0785a',
        padding: 5
    },
    buttons: {
        flexShrink: 1,
        justifyContent: '',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'black'
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18
    },
    line: {
        width: 1,
        backgroundColor: 'black'
    },
    description: {
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    descriptionBox: {
        flexShrink: 1,
        width: '80%',
        backgroundColor: 'rgba(244, 244, 244, 0.8)',
        alignSelf: 'center',
        borderWidth: 1,
        padding: 5
    }
});
