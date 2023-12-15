import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 20,
        width: '90%',
        alignSelf: 'center'
    },
    imageContainer: {
        marginBottom: 15
    },
    trailerTitle: {
        textAlign: 'center',
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 5,
        marginHorizontal: '5%'
    },
    info: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
        marginTop: 30,
        marginBottom: 20,
        textAlign: 'center',
        fontSize: 16
    },
    title: {
        fontSize: 30,
        fontWeight: '600',
        marginVertical: 20,
        textAlign: 'center'
    }
});
