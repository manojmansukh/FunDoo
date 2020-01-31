import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from 'native-base';
import { styles } from '../CSS/CreateNotes.Style'
import moment from 'moment';
import Appbar from './AppBar'
import BottomBar from './BottomBar'
import ToastExample from './ToastExample';
//import { saveNote } from '../Services/AxiosDb'
import { saveNote } from '../Services/FireBaseDb'
import PushNotification from "react-native-push-notification"

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
    }
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  handleNoteBgColour = (color) => this.setState({ bgColor: color });

  handlePinStatus = (status) => this.setState({ pin: status });

  handleShowDialog = (status) => this.setState({ dialogVisible: status });

  handleCloseDialog = (status, date, time, dateTime) => {
    this.setState({ dialogVisible: status ,date: date, time: time, dateTime: dateTime })
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
    if (this.state.note == '' && this.state.title == '') {
      this.props.navigation.navigate('Notes')
      ToastExample.show('Note Discarded', ToastExample.SHORT);
    }
    else {

      if (this.state.dateTime === '') {
        console.log('mjjjkkkkk');

        saveNote(this.state.title, this.state.note, this.state.date, this.state.time, this.state.pin, this.state.bgColor)
        this.props.navigation.navigate('Notes')
        ToastExample.show('Note Create Successfully', ToastExample.SHORT);

      }
      else {
        console.log('mjjj');
        
        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          message: this.state.title,
          subText: this.state.note,
          date: this.state.dateTime
        });
        //firebase method
        saveNote(this.state.title, this.state.note, this.state.date, this.state.time, this.state.pin, this.state.bgColor)
        this.props.navigation.navigate('Notes')
        ToastExample.show('Note Create Successfully', ToastExample.SHORT);

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

        <View style={{ height: '83%', width: '100%', backgroundColor: this.state.bgColor }}>
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
        </View>

        <BottomBar handleBgColour={this.handleNoteBgColour} />

      </View>

    );
  }
}