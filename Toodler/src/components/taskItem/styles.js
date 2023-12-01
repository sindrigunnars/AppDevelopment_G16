import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    checkBox: {
        width: '50%',
        padding: 5
    },
    taskWrapper: {
        flex: 1,
        flexDirection: 'column',
        gap: 10
    },
    description: {
        textAlign: 'center'
    },
    descriptionWrapper: {
        borderBottomWidth: 1,
        padding: 5
    },
    task: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    header: {
        fontSize: 30
    },
    text: {
        fontSize: 15
    },
    individualTask: {
    },
    taskButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '50%',
        maxHeight: 40
    },
    button: {
        width: '35%',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 100,
        backgroundColor: '#f2f2f2',
        padding: 10
    }
});
