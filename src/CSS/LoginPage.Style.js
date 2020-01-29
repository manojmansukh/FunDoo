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
    input: {

        marginTop: 10,
        width: '90%',
        height: 40,
        borderColor: '#314bb0',
        alignSelf: "center",
        borderWidth: 1
    },
    loginText: {
        display: 'flex',
        alignSelf: "center",
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 10,
        top: -2
    },
    submitButton: {
        top: -2,
        alignSelf: "center",
        backgroundColor: '#1e86c7',
        margin: 15,
        height: 40,
        width: 300,
        fontSize: 50,
    },
    fbButton: {
        top: -15,
        alignSelf: "center",
        backgroundColor: '#3f51b5',
        margin: 15,
        height: 40,
        width: 300,
        fontSize: 50,
    },
    submitButtonText: {
        color: 'white',
        padding: 10,
        alignSelf: "center",
        fontSize: 15
    },
    text: {
        top: -15,
        flexDirection: "row",
        fontSize: 15,
        alignSelf: "center",
    },
    error: {
        color: 'red',
        width: '90%',
        marginTop: 1,
        marginHorizontal: 30,
        flexDirection: "row",
        fontSize: 11,
    },
    visibilityBtn:
    {
        position: 'absolute',
        right: 20,
        height: 190,
        bottom: -55,
        width: 35,
        padding: 5
    },

    btnImage:
    {
        resizeMode: 'contain',
        height: '100%',
        width: '100%'
    }
});