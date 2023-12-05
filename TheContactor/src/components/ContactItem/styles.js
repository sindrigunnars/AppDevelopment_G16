import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    contact: {
        flexDirection: 'row',
        padding: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 16,
        alignItems: 'center',
        flexShrink: 1,
        overflow: 'hidden'
    },
    contactImage: {
        height: 60,
        aspectRatio: 1,
        borderRadius: 30,
        marginRight: 8
    },
    contactText: {
        marginLeft: 16,
        maxWidth: '75%',
        fontSize: 20
    }
});
