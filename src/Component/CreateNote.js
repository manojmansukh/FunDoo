import * as React from 'react';
import { StyleSheet, TextInput, Image, ScrollView } from 'react-native';
import { View } from 'native-base';
import { styles } from '../CSS/CreateNotes.Style'
import moment from 'moment';
import Appbar from './AppBar'
import BottomBar from './BottomBar'
import ToastExample from './ToastExample';
//import { saveNote } from '../Services/AxiosDb'
import { saveNote } from '../Services/FireBaseDb'
import PushNotification from "react-native-push-notification"
import Icon from 'react-native-vector-icons/FontAwesome';
export default class CreateNotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: '',
      title: '',
      time: null,
      date: null,
      dialogVisible: false,
      reminder: false,
      pin: false,
      archive: false,
      trash: false,
      bgColor: '#FFFF',
      visible: false,
      currentTime: '',
      dateTime: '',
      imgUrl: ''
    }
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  handleNoteBgColour = (color) => this.setState({ bgColor: color });

  handleImage = (url) => { this.setState({ imgUrl: url }); }

  handlePinStatus = (status) => this.setState({ pin: status });

  handleShowDialog = (status) => this.setState({ dialogVisible: status });

  handleCloseDialog = (status, date, time, dateTime) => {
    this.setState({ dialogVisible: status, date: date, time: time, dateTime: dateTime })
  };

  handleArchiveStatus = (status) => this.setState({ archive: status });

  setDate = () => {
    var time1 =
      this.setState({ date: false });
  };

  setTime = () => {
    this.setState({ date: false });
  };


  handleSaveNote = () => {
    if (this.state.note == '' && this.state.title == '' && this.state.imgUrl == '') {
      this.props.navigation.navigate('Notes')
      ToastExample.show('Note Discarded', ToastExample.SHORT);
    }
    else {

      if (this.state.dateTime === '') {
        saveNote(this.state.title, this.state.note, this.state.date, this.state.time, this.state.pin, this.state.bgColor, this.state.imgUrl)
        this.props.navigation.navigate('Notes')
        ToastExample.show('Note Create Successfully', ToastExample.SHORT);
      }
      else {

        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          message: this.state.title,
          subText: this.state.note,
          date: this.state.dateTime
        });
        //firebase method
        saveNote(this.state.title, this.state.note, this.state.date, this.state.time, this.state.pin, this.state.bgColor, this.state.imgUrl)
        this.props.navigation.navigate('Notes')
        ToastExample.show('Note Create Successfully', ToastExample.SHORT);
        ToastExample.launchMailApp();
        setTimeout(() => {
          ToastExample.show('Note Create Successfully', ToastExample.SHORT);

        }, 2000)
      }
    }
  }

  componentDidMount() {
    var date = moment()
      .utcOffset('+05:30')
      .format(' hh:mm A');
    this.setState({
      currentTime: date
    })
  }

  render() {
    return (
      <View style={{ flex: 1, width: '100%' }}>

        <Appbar handleSaveNote={this.handleSaveNote}
          handlePinStatus={this.handlePinStatus}
          handleShowDialog={this.handleShowDialog}
          handleCloseDialog={this.handleCloseDialog}
          handleArchiveStatus={this.handleArchiveStatus}
          handleSave={this.handleSave}
        />

        <View style={{ height: '84%', width: '100%', backgroundColor: this.state.bgColor }}>
          <ScrollView>
            {
              this.state.imgUrl !== '' ?
                <Image source={{ uri: this.state.imgUrl }} style={{ flex: 1, height: 450, resizeMode: 'stretch', margin: 5 }} />
                : null
            }
            <TextInput multiline={true}
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Title"
              onChangeText={(text) => this.setState({ title: text })} />

            <TextInput multiline={true}
              style={{ marginLeft: 20, fontSize: 15 }}
              underlineColorAndroid="transparent"
              placeholder="Note"
              onChangeText={(text) => this.setState({ note: text })} />
          </ScrollView>
        </View>


        <BottomBar handleBgColour={this.handleNoteBgColour}
          handleImage={this.handleImage}
          handleCaptureImage={this.handleImage} />

      </View>

    );
  }
}
