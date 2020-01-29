import React, { Component } from "react";
import { View, TouchableOpacity, Text, KeyboardAvoidingView, ScrollView, StyleSheet, TextInput } from "react-native";
import firebase from '../fireBase/Config'
import { styles } from '../CSS/ForgotPass.Style'

export default class ForgotPass extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "FunDoo",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { textAlign: "left", flex: 1 }
        };
    };
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
        this.passwordReset = this.passwordReset.bind(this);
    }

    passwordReset = (email) => {
        return firebase.auth().sendPasswordResetEmail(this.state.email)
    }

    render() {
        return (
            <View style={styles.innerView}>
                <Text style={styles.TitleText}>
                    Account Recovery
                </Text>

                <View style={styles.deepView}>
                    <ScrollView style={{ height: '100%', width: '100%' }}>

                        <View style={{ top: 20, alignItems: "center", paddingBottom: 30 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                                Forgot your Password?
                        </Text>
                        </View>

                        <Text style={{ paddingTop: 5, paddingHorizontal: 25, fontSize: 15 }}>
                            Enter the e-mail address you use and
                            you will receive an e-mail contaning a
                            link for changing your password.
                    </Text>

                        <TextInput style={styles.longInput}
                            placeholder="Email address"
                            onChangeText={(text) => this.setState({ email: text })} />

                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={this.passwordReset}>
                            <Text style={styles.sendButtonText}> Send </Text>
                        </TouchableOpacity>
                    </ScrollView>

                </View>
            </View>
        );
    }
}