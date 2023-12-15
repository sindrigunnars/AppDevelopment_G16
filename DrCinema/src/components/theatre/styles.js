import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    item: {
        flex: 1,
        flexDirection: 'column',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowRadius: 5,
        shadowColor: 'black',
        shadowOpacity: 0.1
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        margin: 4
    }
});
