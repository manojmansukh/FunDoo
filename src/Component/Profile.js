// import React, { Component } from 'react';
// import { View, StyleSheet,Linking, Image, TouchableOpacity, Card, Button, Text} from 'react-native';
// import Dialog from "react-native-dialog";
// import Logout from'./Logout'
// import ImagePicker from 'react-native-image-picker';

// export default class DialogProfile extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//      visible:false,
//      image:null,

//     };
//   }

//     render() {
//     return (

//       <Dialog.Container visible={this.props.dialogVisible}>
//         <View style={{ justifyContent: 'center', alignItems: 'flex-end', top: -30 }}>
//           <TouchableOpacity onPress={this.props.handleCancel}>
//             <Image style={{ height: 30, width: 30, }}
//               source={require('../Asserts/Cancle.png')} />
//           </TouchableOpacity>
//         </View>
//         {/* <View style={{top:-40,height:230}}> */}
//           <Logout />
//         {/* </View> */}

//       </Dialog.Container>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     marginTop: 50,
//     padding: 30,
//     backgroundColor: '#ffffff',
//   },
//   input: {
//     width: 250,
//     height: 44,
//     padding: 10,
//     margin: 20,
//     backgroundColor: '#D3D3D3',
//   },
// });

import React, { Component } from 'react';
import { View, PermissionsAndroid, AsyncStorage, Image } from 'react-native';
import { Dialog, Avatar, Button } from 'material-bread';
import { signOut, getUserDetails } from '../Services/FireBaseDb';
import ImagePicker from 'react-native-image-picker'
import * as Permissions from './AndroidPermission'
//import { storeProfileImage } from '../Services/FireBaseDb'
import { Title, Paragraph } from 'react-native-paper';
import { onSignOut } from "./Authentication";
import { storeProfileImage } from '../Services/FireBaseDb'


const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    noData: true,

  },
};

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      image: null,
      userObj: null,
      firstName:'',
      lastNamae:'',
      ProfileImage: null
    };
  }

  uploadProfileImage = async () => {
    const grantCam = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
    const grantRead = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE)
    const grantWrite = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
    if (grantCam && grantRead && grantWrite) {
      this.selectImage()
    }
    else {
      await Permissions.requestCameraPermission()
      await Permissions.requestExternalStoragePermission()
      this.uploadProfileImage()
    }
  }

  selectImage = () => {
    ImagePicker.showImagePicker(options, async (response) => {
      console.log('Response = ', response);

      if (response.uri) {
        await this.setState({
          image: response
        })
        storeProfileImage(response.uri)
      }

    });
  }

  randomColor = () => {
    let colorArray = [
      '#4f2da6', '#cc405c', '#cf6017', '#d1d119', '#54d421',
      '#4d41d4', '#1acfd9', '#25465e', '#625f63', '#2f8f7c',
      '#027b99', '#eb4949', '#bd8b02', '#32a88f', '#655dcf'
    ];
    let random = Math.floor(Math.random() * colorArray.length);
    return colorArray[random];
  }

  componentDidMount = async () => {
    getUserDetails(async (snap) => {
      console.log("mj....", snap.ProfileImage);

      await this.setState({
        userObj: snap,
        firstName: snap.firstName,
        lastNamae: snap.lastNamae,
        ProfileImage: snap.ProfileImage
      })
    })
  }

  render() {
    console.log("mj", this.state.firstName);

    return (
      <>

        <Avatar
          type={'image'}
          size={35}
          image={<Image source={{ uri: this.state.ProfileImage }} />}
          onPress={() => this.setState({ visible: !this.state.visible })}
        />
        <Dialog
          visible={this.state.visible}
          onTouchOutside={() => this.setState({ visible: false })}
          style={
            {
              width: 400,
              padding: 10,
            }
          }
        >
          <Avatar
            type={this.state.userObj === null || this.state.userObj.ProfileImage === undefined ? "text" : 'image'}
            content={this.state.userObj !== null && (this.state.userObj.firstName).charAt(0)}
            contentColor={'white'}
            size={100}
            color={this.randomColor()}
            image={this.state.ProfileImage !== null && <Image source={{ uri: this.state.userObj.ProfileImage }} />}
            style={
              {
                alignSelf: 'center',
              }
            }
            onPress={this.uploadProfileImage}
          />

          {
            this.state.userObj !== null &&
            <View style={{ alignItems: 'center' }}>
              <Title>
                {this.state.userObj.lastNamae !== undefined ?
                  this.state.userObj.firstName + ' ' + this.state.userObj.lastNamae : this.state.userObj.firstName}
              </Title>
              <Paragraph>
                {this.state.userObj.email}
              </Paragraph>
            </View>
          }

          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingVertical: 20
            }}
          >
            <Button
              text={'cancel'}
              onPress={() => this.setState({ visible: false })}
            />
            <Button
              text={'Sign out'}
              onPress={() => onSignOut().then(() =>
                this.setState({ visible: false }),
                this.props.navigation.navigate('SignIn'))}
            />
          </View>
        </Dialog>
      </>
    );
  }
}