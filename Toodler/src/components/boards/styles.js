import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        rowGap: 10
    },
    radio: {
        flexShrink: 1,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        rowGap: 10
    },
    titleContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignContent: 'flex-start'
    },
    title: {
        fontSize: 15,
        justifyContent: 'center'
    }
});
