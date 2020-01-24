import * as React from 'react';
import { StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'native-base';
import moment from 'moment';
import { saveNote } from '../Services/FireBaseDb'
import Appbar from './AppBar'
import BottomBar from './BottomBar'
// import { saveNote } from '../Services/AxiosDb'
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

  handleShowDialog = (status) => this.setState({ dialogVisible: true });

  handleCloseDialog = (status, date, time) => this.setState({ dialogVisible: false, date: date, time: time });

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
      console.log("blanck");
      this.props.navigation.navigate('Notes')
    }
    else {
      if (this.state.dateTime === '') {
        saveNote(this.state.title, this.state.note, this.state.date, this.state.time, this.state.pin, this.state.bgColor)
        this.props.navigation.navigate('Notes')
      }
      else {
        PushNotification.localNotificationSchedule({
          //... You can use all the options from localNotifications
          message: this.state.title,
          subText: this.state.note,
          date: this.state.dateTime
        });
        //firebase method
        saveNote(this.state.title, this.state.note, this.state.date, this.state.time, this.state.pin, this.state.bgColor)
        this.props.navigation.navigate('Notes')
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
        />
        {/* <Appbar style={styles.top}>
          <Appbar.Action icon={require('../Image/arrow_back.png')}
            onPress={() => {
              this.handleSaveNote()
              this.props.navigation.navigate('Notes')
            }} />

          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end' }}>
            <Appbar.Action icon={this.state.pin ? require('../Image/pin.png') : require('../Image/unpin.png')}
              onPress={() => this.setState({ pin: !this.state.pin }, () => { console.log("manoj" + this.state.pin) })} />
            <Appbar.Action icon={require('../Image/bell1.png')} onPress={this.showDialog} />
            <Appbar.Action icon={this.state.archive ? require('../Image/Archive.png') : require('../Image/Unarchive.png')}
              onPress={() => this.setState({ archive: !this.state.archive })} />
          </View>
        </Appbar> */}

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

const styles = StyleSheet.create({
  top: {
    backgroundColor: 'white',
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: .1,
  },
  input: {
    marginTop: 10,
    width: '90%',
    height: 70,
    alignSelf: "center",
    borderBottomColor: 'black',
    fontSize: 30,
    //Horizontal:50
  },
});