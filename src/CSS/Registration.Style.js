import { StyleSheet } from 'react-native';

export var styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#daebf4",
    },
    innerView: {
        flex: 1,
        width: '100%',
        backgroundColor: "white",
    },
    TitleText: {
        display: 'flex',
        alignSelf: "center",
        width: '90%',
        marginTop: 20,
        marginBottom: 60,
        fontSize: 30,
        fontWeight: "bold",
    },
    deepView: {
        display: 'flex',
        flexDirection: "row",
        alignSelf: 'center',
    },
    input: {
        width: '90%',
        height: '8%',
        borderColor: '#FF9800',
        alignSelf: "center",
        borderWidth: .7
    },
    text: {
        marginTop: -3,
        width: '90%',
        alignSelf: 'center'
    },
    shortInput: {
        alignSelf: 'flex-start',
        marginTop: 10,
        marginHorizontal: 10,
        width: '38%',
        height: '70%',
        borderColor: '#FF9800',
        borderWidth: .7,
    },
    longInput: {
        backgroundColor: 'red',
        top: 5,
        height: 40,
        width: 339,
        borderColor: '#FF9800',
        alignSelf: "center",
        borderWidth: 1,
    },
    submitButton: {
        alignSelf: "center",
        backgroundColor: '#FF9800',
        margin: 10,
        height: 40,
        width: '40%',
        fontSize: 30,
    },
    submitButtonText: {
        color: 'white',
        padding: 10,
        alignSelf: "center"
    },
    error: {
        color: 'red',
        width: '90%',
        marginTop: 1,
        marginHorizontal: 30,
        flexDirection: "row",
        fontSize: 11,
    },
    errorPassword: {
        color: 'red',
        width: '35%',
        marginTop: -6,
        marginHorizontal: 30,
        flexDirection: "row",
        fontSize: 11,
    },
});