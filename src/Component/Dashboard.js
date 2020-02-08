import * as React from 'react';
import firebase from '../fireBase/Config';
import DialogWhatsappMessage from './DialogWhatsappMessage';
import ToastExample from './ToastExample';
import DialogProfile from './Profile'
import axios from 'axios';
import moment from 'moment';
import { View } from 'native-base';
import { AsyncStorage } from "react-native";
import AppBar1 from './AppBar1';
import { Chip, } from 'react-native-paper';
import AppBarSelectedNotes from './AppBarSelectedNotes';
import PushNotification from "react-native-push-notification";
import Bottombar1 from './Bottombar1';
import { styles } from '../CSS/Dashboard.Style'
import { FlatList, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { getNotes, setPin, setArchive, setTrash, PermanentDelete ,getUserId} from '../Services/FireBaseDb';
//import { getNotes, setPin, setArchive, setTrash, } from '../Services/AxiosDb';

var dateTime, note, title, systemTime;
const URL = "https://www.google.com/"
var SendIntentAndroid = require("react-native-send-intent");

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      toggleDrawer: true,
      dataSource: [],
      pinData: [],
      unPinData: [],
      numColumns: 1,
      listView: true,
      selectionMode: false,
      selectedData: [],
      permantDelete: false,
      visibl: false,
      currentTime: '',
      date: '',
      time: '',
      nameList: '',
      users: [],
      dialogVisible: false,
      profileVisible: false,

    };
  }

  showNotification = (dateTime, note, title) => {

    if (this.state.currentTime === dateTime) {
      PushNotification.localNotification({
        title: title,
        message: note,
        color: 'white',
        vibrate: true,
      })
    }
  }


  handleSelectionMode = (mode) => {
    this.setState({ selectionMode: mode })
    this.setState({ selectedData: [] })
  }

  handleNavigation = () => { this.props.navigation.navigate('CreateNote') }

  //selected node operation.
  handlePinStatus = (status) => {
    this.setState({ pin: status }, () => {
      this.state.selectedData.map(currentNoteId => (
        //firebase Method
        setPin(currentNoteId, this.state.pin)
      ))
    })
  }

  handleArchive = (status) => {
    this.setState({ archive: status }, () => {
      this.state.selectedData.map(currentNoteId => (
        //firebase Method
        setArchive(currentNoteId, this.state.archive)
      ))
    })
  }

  handleTrash = (status) => {
    this.setState({ trash: status }, () => {
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId => (
        //firebase Method
        setTrash(currentNoteId, this.state.trash)
      ))
    })
  }

  handlePermantDelete = (status) => {
    this.setState({ permantDelete: status }, () => {
      console.log(this.state.permantDelete);
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId => (
        PermanentDelete(currentNoteId)
      ))
    })
  }

  handleListView = (listView) => {
    this.setState({ listView: listView }, () => {
      if (listView == true) {
        return this.setState({ numColumns: 1 })
      }
      this.setState({ numColumns: 2 })
    })
  }

  handlerLongClick = (noteId) => {
    this.setState({ selectionMode: true })
    this.handleSelectionNode(noteId)
  };

  handleSelectionNode = (noteId) => {
    if (this.state.selectedData.includes(noteId)) {
      var selectedNode = this.state.selectedData.filter(element => element !== noteId)
      this.setState({ selectedData: selectedNode }, () => {
        if (this.state.selectedData.length == 0) {
          this.setState({ selectionMode: false })
        }
      })
    }
    else {
      var selectedNode = this.state.selectedData.concat(noteId)
      this.setState({ selectedData: selectedNode })
    }
  }

  //1
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  //Remove listeners allocated in createNotificationListeners()
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    *
   */
    console.log('notification'),

      this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
      });

    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
 
  handleCancel = () =>{
    this.setState({ dialogVisible: false, profileVisible: false  })

  }

  handleWhatsAppOpen = () => {
    this.setState({ dialogVisible: true })
    //Linking.openURL(`whatsapp://send?phone=${918605621964}&text=${"hiii"}`);
  }

  handleMailAppOpen = () => {
    ToastExample.launchMailApp();
  }

  handleBrowserOpen = () => {
    Linking.openURL(URL).catch((err) => console.error('An error occurred', err));
  }

  handleProfileSet =() =>{
    this.setState({ profileVisible: true })
  }

  async componentDidMount() {
    getUserId();

    this.showNotification(dateTime, note, title)
    var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD LT');
    this.setState({
      currentTime: date
    });

    //firebase method & Axios method
    getNotes((snapshotValue) => {
      this.setState({
        dataSource: snapshotValue,
        listView: true,
      }, () => {
        var pinData = []
        var unPinData = []
        this.state.dataSource !== null ?
          Object.keys(this.state.dataSource).map((key) => {
            var Key = key
            var data = this.state.dataSource[key]

            if (this.state.dataSource[key].Pin == true && this.state.dataSource[key].Trash == false) {
              this.state.dataSource[key].noteId = key
              pinData.push(this.state.dataSource[key])
            }
            else if (this.state.dataSource[key].Pin == false && this.state.dataSource[key].Trash == false) {
              this.state.dataSource[key].noteId = key
              unPinData.push(this.state.dataSource[key])
            }
            this.setState({
              pinData: pinData,
              unPinData: unPinData,
            })
          })
          : null
      })
    })
  }


  componentWillUnmount() {
    // this.notificationListener();
    //this.notificationOpenedListener();
  }

  render() {

    return (
      <View style={{ flex: 1, width: '100%', height: "100%" }}>
        <View style={{ height: '12%', }}>
          {
            this.state.selectionMode ?
              <AppBarSelectedNotes
                handleSelectionMode={this.handleSelectionMode}
                handlePinStatus={this.handlePinStatus}
                handleArchive={this.handleArchive}
                handlePermantDelete={this.handlePermantDelete}
                handleTrash={this.handleTrash}
              />
              : <AppBar1 navigation={this.props.navigation}
               handleListView={this.handleListView} 
                //handleProfileSet={this.handleProfileSet}
                handleCancel={this.handleCancel}
               />

          }
        </View>
        <View style={{ width: '100%', display: 'flex', height: '80%', }}>
          <ScrollView>
            <View>
              {
                this.state.pinData.length !== 0 ? <View><Text style={{ fontSize: 12, marginLeft: 10, top: 5, bottom: 5, margin: 3 }}>PINNED</Text></View> : null
              }
              <FlatList
                numColumns={this.state.numColumns} //toggle no of columns
                key={this.state.numColumns}
                data={Object.keys(this.state.pinData)}


                renderItem={({ item }) =>
                  <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                    onLongPress={() => this.handlerLongClick(this.state.pinData[item].noteId)}
                    onPress={() => this.state.selectionMode ? this.handleSelectionNode(this.state.pinData[item].noteId) : this.props.navigation.navigate('EditNote', { 'inform': this.state.pinData[item], "currentNoteId": this.state.pinData[item].noteId })}
                  >
                    <View style={{ backgroundColor: this.state.pinData[item].BgColor, paddingTop: 10, paddingBottom: 10, width: '100%', position: "relative", borderRadius: 7, borderWidth: 1, display: 'flex', borderColor: this.state.selectionMode && this.state.selectedData.includes(this.state.pinData[item].noteId) ? 'black' : '#DDE6E2', }}>
                      <View>
                        <Text style={styles.subText}>{this.state.pinData[item].Title}</Text>
                        <Text style={styles.subText}>{this.state.pinData[item].Note}</Text>

                        {
                          dateTime = this.state.pinData[item].Date + " " + this.state.pinData[item].Time,
                          note = this.state.pinData[item].Note,
                          title = this.state.pinData[item].Title,

                          //local notification method
                          this.showNotification(dateTime, note, title),

                          this.state.pinData[item].Date !== undefined && this.state.pinData[item].Time !== undefined ?
                            <Chip icon={require('../Asserts/add_Alarm.png')}
                              style={{ bottom: 0, width: 180, marginLeft: 6, backgroundColor: 'transparent', borderColor: 'greay' }}>
                              {this.state.pinData[item].Date}{'  '}{this.state.pinData[item].Time}</Chip>
                            : null
                        }
                      </View>
                    </View>
                  </TouchableOpacity>
                }
              />

            </View>
            {
              this.state.unPinData.length !== 0 ? <View><Text style={{ fontSize: 12, marginLeft: 10, top: 3, margin: 3 }}>OTHERS</Text></View> : null
            }
            <FlatList
              numColumns={this.state.numColumns} //toggle no of columns
              key={this.state.numColumns}
              data={Object.keys(this.state.unPinData)}

              renderItem={({ item }) =>
                <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                  onLongPress={() => this.handlerLongClick(this.state.unPinData[item].noteId)}
                  onPress={() => this.state.selectionMode ? this.handleSelectionNode(this.state.unPinData[item].noteId) : this.props.navigation.navigate('EditNote', { 'inform': this.state.unPinData[item], "currentNoteId": this.state.unPinData[item].noteId })}
                >
                  <View style={{ backgroundColor: this.state.unPinData[item].BgColor, paddingTop: 10, paddingBottom: 10, width: '100%', position: "relative", borderColor: '#DDE6E2', borderRadius: 7, borderWidth: 1, display: 'flex', borderColor: this.state.selectionMode && this.state.selectedData.includes(this.state.unPinData[item].noteId) ? 'black' : '#DDE6E2', }}>

                    <View style={{}}>
                      <Text style={styles.subText}>{this.state.unPinData[item].Title}</Text>
                      <Text style={styles.subText}>{this.state.unPinData[item].Note}</Text>
                      {
                        dateTime = this.state.unPinData[item].Date + " " + this.state.unPinData[item].Time,
                        note = this.state.unPinData[item].Note,
                        title = this.state.unPinData[item].Title,
                        //this.showNotification(dateTime,note,title),
                        this.state.unPinData[item].Date !== undefined && this.state.unPinData[item].Time !== undefined ?
                          <Chip icon={require('../Asserts/add_Alarm.png')}
                            style={{ bottom: 0, width: 180, marginLeft: 6, backgroundColor: 'transparent', borderColor: 'lightgreay' }}>
                            {this.state.unPinData[item].Date}{'  '}{this.state.unPinData[item].Time}</Chip>
                          : null
                      }
                    </View>
                  </View>
                </TouchableOpacity>
              }
            />
            {/* </View> */}
          </ScrollView>
        </View >

        <Bottombar1 handleNavigation={this.handleNavigation}
          handleBrowserOpen={this.handleBrowserOpen}
          handleWhatsappOpen={this.handleWhatsAppOpen}
          handleGmailOpen={this.handleMailAppOpen}
        />
        <DialogWhatsappMessage dialogVisible={this.state.dialogVisible}
          handleCancel={this.handleCancel}
          handleSave={this.handleSave} />

        {/* <DialogProfile dialogVisible={this.state.profileVisible}
          handleCancel={this.handleCancel}
          handleSave={this.handleSave} /> */}

      </View>
    );
  }
}
