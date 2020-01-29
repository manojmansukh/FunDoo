import Icon from "react-native-vector-icons/Ionicons"
import React, { useEffect, useRef, useState } from "react"
import { ImageBackground, SafeAreaView, StatusBar, Text, StyleSheet, TouchableHighlight, View } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import * as Keychain from 'react-native-keychain';
import { getUserName } from '../Services/FireBaseDb';
import { styles } from '../CSS/Lock.Style'
import { AsyncStorage } from "react-native";
import fundoo from './Fundoo'

const ACCESS_CONTROL_OPTIONS = ['None', 'Passcode', 'Password'];
const ACCESS_CONTROL_MAP = [null, Keychain.ACCESS_CONTROL.DEVICE_PASSCODE, Keychain.ACCESS_CONTROL.APPLICATION_PASSWORD, Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET]

const Lock = (props) => {
    const [state, setState] = useState(
        {
            username: '',
            password: '',
            status: '',
            passwordSet: false,
            biometryType: null,
            accessControl: null,
            dataSource: ''
        }
    )
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [showCompletedButton, setShowCompletedButton] = useState(false)

    // useEffect(async() => {
    //     console.log("tyruyf");
    //    let a =await AsyncStorage.getItem('passwordSet')
    //    console.log(a);
       
    // },[])
    useEffect(() => {
        console.log('hiiiii');
        getUserName((snapshotValue) => {
            console.log("mjjjj", state.username)
            console.log(snapshotValue.firstName)
            var userName = snapshotValue.firstName + snapshotValue.lastNamae
            console.log(userName)
            setState({ username: userName })
        })

        if (enteredPin.length > 0) {
            setShowRemoveButton(true)
        } else {
            setShowRemoveButton(false)
        }
        if (enteredPin.length === 8) {
            setShowCompletedButton(true)
        } else {
            setShowCompletedButton(false)
        }
    }, [enteredPin])
    //console.log(enteredPin);
    const save = async (accessControl) => {
        console.log('mj', state.username);
        console.log('mj', enteredPin);
        //AsyncStorage.setItem(passwordSet , "true")
        setState({ passwordSet: true });
        AsyncStorage.setItem("passwordSet", true)

        try {
            await Keychain.setGenericPassword(
                state.username,
                enteredPin,
                { accessControl: state.accessControl }
            );
            setState({ username: '', password: '', passwordSet: true, status: 'Credentials saved!' });
        } catch (err) {
            setState({ status: 'Could not save credentials, ' + err });
        }
    }

    const login = async () => {
        console.log(state.username);
        console.log(enteredPin);
        var pass = JSON.stringify({ "password": enteredPin, "service": "", "username": state.username })
        console.log('pass', pass);

        try {
            const credentials = await Keychain.getGenericPassword();
            console.log(credentials);
            console.log('mj', credentials.password);

            if (credentials.username === state.username && credentials.password === enteredPin) {
                console.log("login successfull");
                props.navigation.navigate('Drawer')

            } else {
                console.log("login Unsuccessfull");
                setState({ status: 'Enter correct Password. ' });

            }
        } catch (err) {
            setState({ status: 'Could not load credentials. ' + err });
        }
    }

    const reset = async () => {
        console.log("reset", state.passwordSet);
     setState({ passwordSet: false });
        console.log("resetgg", state.passwordSet);


        try {
            await Keychain.resetGenericPassword();
            setState({
                status: 'Credentials Reset!',
                username: '',
                enteredPin: '',
            });
        } catch (err) {
            setState({ status: 'Could not reset credentials, ' + err });
        }
    }

    //console.log();

    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView
                style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}>
                <Text
                    style={{
                        paddingTop: 24,
                        paddingBottom: 48,
                        color: "rgba(255,255,255,0.7)",
                        fontSize: 48,
                    }}>
                    Fundoo
          </Text>
                <ReactNativePinView
                    inputSize={32}
                    ref={pinView}
                    pinLength={5}
                    buttonSize={60}
                    onValueChange={value => setEnteredPin(value)}
                    buttonAreaStyle={{
                        marginTop: 24,
                    }}
                    inputAreaStyle={{
                        marginBottom: 24,
                    }}
                    inputViewEmptyStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 1,
                        borderColor: "#FFF",
                    }}
                    inputViewFilledStyle={{
                        backgroundColor: "#FFF",
                    }}
                    buttonViewStyle={{
                        borderWidth: 1,
                        borderColor: "#FFF",
                    }}
                    buttonTextStyle={{
                        color: "#FFF",
                    }}
                    onButtonPress={key => {
                        if (key === "custom_left") {
                            pinView.current.clear()
                        }
                        if (key === "custom_right") {
                            alert("Entered Pin: " + enteredPin)
                        }

                    }}
                    customLeftButton={showRemoveButton ? <Icon name={"ios-backspace"} size={36} color={"#FFF"} /> : undefined}
                    customRightButton={showCompletedButton ? <Icon name={"ios-unlock"} size={36} color={"#FFF"} /> : undefined}
                />
                <View style={styles.buttons}>
                    
                            <TouchableHighlight
                                onPress={() => save()}
                                style={styles.button}
                            >
                                <View style={styles.save}>
                                    <Text style={styles.buttonText}>Save</Text>
                                </View>
                            </TouchableHighlight> 

                            
                            <TouchableHighlight
                                onPress={() => login()}
                                style={styles.button}
                            >
                                <View style={styles.load}>
                                    <Text style={styles.buttonText}>Login</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                onPress={() => reset()}
                                style={styles.button}
                            >
                                <View style={styles.reset}>
                                    <Text style={styles.buttonText}>Reset</Text>
                                </View>
                            </TouchableHighlight>
                    
                
                </View>

            </SafeAreaView>
        </>
    )
}

export default Lock
