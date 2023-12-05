import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').height;

export default StyleSheet.create({
    title: {
        fontSize: 20,
        padding: 5
    },
    centeredView: {
        flexGrow: 1,
        height: '100%',
        width: '100%'

    },
    modalView: {
        alignSelf: 'center',
        top: windowWidth / 5,
        flexGrow: 1.5,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 40,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 100,
        elevation: 100,
        width: '90%'
    }
});
