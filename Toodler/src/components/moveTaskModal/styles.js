import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#f23006',
        padding: 10,
        marginBottom: 10
    },
    centeredView: {
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        height: '50%'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
        gap: 10
    },
    buttonOpen: {
        backgroundColor: '#f23006'
    },
    buttonClose: {
        backgroundColor: '#f23006',
        width: '90%'
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
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
    title: {
        fontSize: 20,
        padding: 5
    },
    flatlist: {
        flexGrow: 1,
        flexDirection: 'column'
    }
});
