import React, { Component } from 'react';
import { View, StyleSheet, Text, Linking, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import Dialog from "react-native-dialog";
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native';

export default class DialogWhatsappMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mobile_no: '',
            msg: '',
        };
    }

    handleContacts =()=>{
        console.log('jjjj');
       
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.',
                'buttonPositive': 'Please accept bare mortal'
            }
        ).then(() => {
            Contacts.getAll((err, contacts) => {
                if (err === 'denied') {
                    // error
                    console.log("error:", err);

                } else {
                    console.log("contavt:",contacts);
                    
                    // contacts returned in Array
                }
            })
        })
    }
    sendOnWhatsApp = () => {
        let msg = this.state.msg;
        let mobile = this.state.mobile_no;
        if (mobile) {
            if (msg) {
                let url = 'whatsapp://send?text=' + this.state.msg + '&phone=91' + this.state.mobile_no;
                Linking.openURL(url).then((data) => {
                    console.log('WhatsApp Opened');
                }).catch(() => {
                    alert('Make sure Whatsapp installed on your device');
                });
            } else {
                alert('Please insert message to send');
            }
        } else {
            alert('Please insert mobile no');
        }
    }

    // componentDidMount(){

    //     PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //         {
    //             'title': 'Contacts',
    //             'message': 'This app would like to view your contacts.',
    //             'buttonPositive': 'Please accept bare mortal'
    //         }
    //     ).then(() => {
    //         Contacts.getAll((err, contacts) => {
    //             if (err === 'denied') {
    //                 // error
    //                 console.log("error:", err);

    //             } else {
    //                 console.log("contavt:", contacts);

    //                 // contacts returned in Array
    //             }
    //         })
    //     })
    // }
    render() {
        return (

            <Dialog.Container visible={this.props.dialogVisible}>

                <View style={{ justifyContent: 'center', alignItems: 'flex-end', top: -30 }}>
                    <TouchableOpacity onPress={this.props.handleCancel}>
                    <Image style={{ height: 30, width: 30,   }}
                        source={require('../Asserts/Cancle.png')} />
                    </TouchableOpacity>
                </View>

                <View style={{justifyContent:'center',alignItems:'center',top:-30}}>
                    <Image style={{ height: 100, width: 100, }}
                        source={require('../Asserts/Whatsapp.jpeg')} />
                </View>
                <TouchableOpacity onPress={this.handleContacts}>
                <Text>manoj</Text>
            </TouchableOpacity>
       
                <TextInput
                    value={this.state.mobile_no}
                    //onChangeText={this.handleContacts}
                    onChangeText={mobile_no => this.setState({ mobile_no })}
                    placeholder={'Enter Mobile'}
                    style={styles.input}
                    keyboardType={'numeric'}
                />
                <TextInput
                    value={this.state.msg}
                    multiline={true}
                    onChangeText={msg => this.setState({ msg })}
                    placeholder={'Enter message'}
                    style={styles.input}
                />
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={this.sendOnWhatsApp}
                        title='Send WhatsApp Message'
                    />
                </View>
            </Dialog.Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 50,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        margin: 20,
        backgroundColor: '#D3D3D3',
    },
});