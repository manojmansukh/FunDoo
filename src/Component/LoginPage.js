import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, KeyboardAvoidingView, ScrollView, ActivityIndicator, TextInput } from "react-native";
import firebase from '../fireBase/Config';
import { onSignIn } from "./Authentication";
import { AsyncStorage } from "react-native";
import { getUserId } from '../Services/FireBaseDb'
import { styles } from '../CSS/LoginPage.Style';
import { LoginButton, AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk';
//import firebase from 'react-native-firebase'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailError: null,
      passError: null,
      showPassword: true,
      hidePassword: true,
      user_name: '',
      fbId: '',
      avatar_url: '',
      avatar_show: false,
      ProfileImage:'',
      loading: true,
    }
  }

  managePasswordVisibility = () => {
    this.setState({ hidePassword: !this.state.hidePassword });
  }

  validateEmail = (text) => {
    let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.test(text) === false) {
      this.setState({ emailError: 'Email is Not Correct' });
      return false;
    }
    else {
      //email correct
      this.setState({ email: text })
      this.setState({ emailError: null });
      return true;
    }
  }

  validatePass = (text) => {
    let pass = /^[#\w@_-]{8,20}$/
    if (pass.test(text) === false) {
      this.setState({ passError: 'enter valid pass' });
      this.setState({ password: text })
      return false;
    }
    else {
      //email correct
      this.setState({ password: text })
      this.setState({ passError: null });
    }
  }

  hadleFaceBookLogin = async () => {
   
    try {
      let result = await LoginManager.logInWithPermissions(['public_profile'])
      if (result.isCancelled) {
        alert('loin was cancelled');
      }
      else {
        this.userDetails();
        //this.props.navigation.navigate('Drawer')
      }

    } catch (error) {
      console.log(error);
      alert('login failed with error' + error)
    }
  }

  userDetails = () => {
    console.log("details")
    // Create a graph request asking for user information with a callback to handle the response.
    const infoRequest = new GraphRequest(
      '/me?fields=name,email,picture.type(large)',
      null,
      this._responseInfoCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  _responseInfoCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data: ' + error);
    } else {
      this.setState({ user_name: result.name, fbId: result.id, email: result.email, ProfileImage: result.picture.data.url}, () => {
      })

      AccessToken.getCurrentAccessToken()
        .then((data) => {
          const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
          firebase.auth().signInWithCredential(credential)
            // .then(loginUserSuccess(dispatch))
            .then((success) => {
              this.registerFbUser(success.user.uid)
            })
            .catch(function (error) {
              var errorCode = error.code;
              var errorMessage = error.errorMessage;
              console.log('Error code :' + errorCode);
              console.log('Error Msg :' + errorMessage);
            });
        });
    }
  }

  registerFbUser = async(uid) => {
    firebase.database().ref('/users/' + uid + '/personal').set({
      firstName: this.state.user_name,
      email: this.state.email,
      fbId: this.state.fbId,
      ProfileImage: this.state.ProfileImage


    })
    onSignIn();
    await AsyncStorage.setItem("UserId",uid)
    this.setState({ loading: false })
    this.props.navigation.navigate('SplashScreen')
   }

   //email Login
  handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async() => {
        onSignIn()
        await AsyncStorage.setItem("UserId", firebase.auth().currentUser.uid).then(console.log("mj"))
        await getUserId()
        this.setState({ loading: false})
        //this.props.navigation.navigate('Lock')
        this.props.navigation.navigate('SplashScreen')

      })
      .catch((error) => {
        alert("Enter the valid Details...!", error)
        var errorCode = error.code;
        var errorMessage = error.errorMessage;

      });
  }

  render() {
    // if (this.state.loading) {
    //   return (
    //     <View style={styles.loader}>
    //       <ActivityIndicator size="large" color="#0c9" />
    //     </View>
    //   )
    // }
    return (

      <KeyboardAvoidingView style={styles.innerView}>
        <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: "wrap", justifyContent: 'center', alignItems: 'center', top: -5 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../Asserts/Logo.png')}
                style={{ width: 300, height: 200, top: 30, tintColor: '#1e59c7' }}
                resizeMode='contain'
              />
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', top: 10, }}>
                <View ><Text style={{ color: '#4285F4', fontSize: 60, fontWeight: 'bold', }}>F</Text></View>
                <View><Text style={{ color: '#DB4437', fontSize: 60, fontWeight: 'bold' }}>u</Text></View>
                <View ><Text style={{ color: '#F4B400', fontSize: 60, fontWeight: 'bold' }}>n</Text></View>
                <View ><Text style={{ color: '#4285F4', fontSize: 60, fontWeight: 'bold' }}>D</Text></View>
                <View ><Text style={{ color: '#0F9D58', fontSize: 60, fontWeight: 'bold' }}>o</Text></View>
                <View ><Text style={{ color: '#DB4437', fontSize: 60, fontWeight: 'bold' }}>o</Text></View>
              </View>

              <Text style={styles.loginText}>
                Login
            </Text>
            </View>

            <View>
              <TextInput style={styles.input}
                testID="email"
                underlineColorAndroid="transparent"
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(text) => this.validateEmail(text)} />
              <Text style={styles.error}>{this.state.emailError}</Text>

              <TextInput style={styles.input}
                testID="password"
                underlineColorAndroid="transparent"
                placeholder="Password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={this.state.hidePassword}
                onChangeText={(password) => this.setState({ password })}
                onChangeText={(text) => this.validatePass(text)} />
              <Text style={styles.error}>{this.state.passError}</Text>

              <View>
                <TouchableOpacity activeOpacity={0.8} style={styles.visibilityBtn} onPress={this.managePasswordVisibility}>
                  <Image source={(this.state.hidePassword) ? require('../Asserts/hide.png') : require('../Asserts/show.png')} style={styles.btnImage} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={this.handleLogin}>
                <Text style={styles.submitButtonText}> Login </Text>
              </TouchableOpacity>

              <View style={{ justifyContent: 'center', alignItems: 'center', top: -9 }}>
                <Text style={{ fontWeight: 'bold' }}>OR</Text>
              </View>

              <TouchableOpacity
                // style={styles.fbButton}
                onPress={this.hadleFaceBookLogin}>
                {/* onPress={this.facebookLogin}> */}
                <Image source={require('../Asserts/FbLogin.png')}
                  style={{ height: 40, width: 300, margin: 15, borderColor: 'black', borderWidth: .15, top: -15 }} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('ForgotPass') }}>
                <Text style={styles.text}>
                  Forgot Password?
              </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUp') }}>
                <Text style={styles.text}>
                  Sign UP
              </Text>
              </TouchableOpacity>

            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
