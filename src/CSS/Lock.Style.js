import { StyleSheet } from 'react-native';

export var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '200',
        textAlign: 'center',
        marginBottom: 20,
    },
    field: {
        marginVertical: 5,
    },
    label: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 5,
    },
    input: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
        backgroundColor: 'white',
        height: 32,
        fontSize: 14,
        padding: 8,
    },
    status: {
        color: '#333',
        fontSize: 12,
        marginTop: 15,
    },
    biometryType: {
        color: '#333',
        fontSize: 12,
        marginTop: 15,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        backgroundColor: 'red'
    },
    button: {
        borderRadius: 3,
        overflow: 'hidden',
    },
    save: {
        backgroundColor: '#0c0',
    },
    load: {
        backgroundColor: '#333',
    },
    reset: {
        backgroundColor: '#c00',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
});