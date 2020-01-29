import { StyleSheet } from 'react-native';

export var styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width: '100%',
        backgroundColor: "#daebf4",
    },
    innerView: {
        flex: 1,
        height: '90%',
        alignSelf: 'center',
        backgroundColor: "white",
        width: 'auto'
    },
    TitleText: {
        width: '90%',
        display: 'flex',
        alignSelf: "center",
        marginHorizontal: 10,
        marginVertical: 20,
        fontSize: 25,
        fontWeight: "bold",
        color: '#0693e9'
    },
    deepView: {
        width: '90%',
        height: '72%',
        display: 'flex',
        backgroundColor: "#f4f7fa",

    },
    sendButton: {
        top: 25,
        alignSelf: "center",
        backgroundColor: '#7a42f4',
        margin: 25,
        height: 40,
        width: 180,
        fontSize: 30,
    },
    sendButtonText: {
        color: 'white',
        padding: 10,
        alignSelf: "center"
    },
    longInput: {
        top: 20,
        height: 40,
        width: 280,
        borderColor: '#7a42f4',
        backgroundColor: "white",
        alignSelf: "center",
        borderWidth: 1,
    },
})