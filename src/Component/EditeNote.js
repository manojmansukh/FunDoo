import * as React from 'react';
import { StyleSheet, Image, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Icon } from 'react-native';
import { View } from 'native-base';
import Appbar from './AppBar'
import BottomBar from './BottomBar';
import DialogReminder from './DialogReminder'
import moment from 'moment';
import PushNotification from "react-native-push-notification"
import { editNote, setReminder, moveToTrash } from '../Services/FireBaseDb'
//import { editNote, setReminder, moveToTrash } from '../Services/AxiosDb'


export default class EditeNotes extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      note: '',
      title: '',
      date: '',
      time: '',
      dataSource: [],
      pin: '',
      archive: '',
      visible: false,
      trash: '',
      currentTime: '',
      bgColor: ''
    }
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }
  showDialog = () => {
    console.log('mj');
    this.setState({ dialogVisible: true }, () => {
      console.log('Hiii' + this.state.dialogVisible);
    });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false }, () => {
      console.log("handle cancle");
    });
  };

  handleDelete = () => {
    this.setState({ trash: true }, () => {
      var currentNoteId = this.props.navigation.state.params.currentNoteId
      //firebase method
      moveToTrash(currentNoteId, this.state.trash)
      this.props.navigation.navigate('Notes')
    })
  }

  handleSaveReminder = (date, time, dateTime) => {
    console.log(dateTime);

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: this.state.title, // (required)
      subText: this.state.note,
      date: dateTime // in 60 secs
    });

    this.setState({ date: date }, () => { console.log("Date:" + this.state.date); })
    this.setState({ time: time }, () => {
      var currentNoteId = this.props.navigation.state.params.currentNoteId
      //firebase Method
      setReminder(currentNoteId, this.state.date, this.state.time)


    })
    console.log(this.props.navigation.state.params.currentNoteId);
    this.setState({ dialogVisible: false }, () => {
    });
  };

  handleSaveNote = () => {

    if (this.state.note == '' && this.state.title == '') {
      this.props.navigation.navigate('Notes')
    }
    else {
      var currentNoteId = this.props.navigation.state.params.currentNoteId
      //firebase Method
      editNote(currentNoteId, this.state.title, this.state.note, this.state.pin, this.state.archive, this.state.trash, this.state.bgColor)
    }
  }

  handleNoteBgColour = (color) => this.setState({ bgColor: color });

  componentDidMount() {
    console.log('archive:', this.props.navigation.state.params.inform);
    var date = moment()
      .utcOffset('+05:30')
      .format(' hh:mm A');

    this.setState({
      dataSource: this.props.navigation.state.params.inform,
      currentTime: date
    }, () => {
      console.log("mjjj:", this.state.dataSource.color);
      this.setState({
        title: this.state.dataSource.Title,
        note: this.state.dataSource.Note,
        pin: this.state.dataSource.Pin,
        archive: this.state.dataSource.Archive,
        trash: this.state.dataSource.Trash,
        bgColor: this.state.dataSource.BgColor
      })

    })
  }
  render() {
    let selectedColor = '#fff';
    console.log(this.props.navigation.state.params);
    console.log("pin status:" + this.state.col);

    console.log(this.props.navigation.state.params.currentNoteId);

    return (
      <View style={{ flex: 1 }}>
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
            }
            } />
          <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
            <Appbar.Action icon={this.state.pin ? require('../Image/pin.png') : require('../Image/unpin.png')}
              onPress={() => this.setState({ pin: !this.state.pin }, () => { console.log("manoj" + this.state.pin) })} />
            <Appbar.Action icon={require('../Image/bell1.png')} onPress={this.showDialog} />
            <Appbar.Action icon={this.state.archive ? require('../Image/Archive.png') : require('../Image/Unarchive.png')}
              onPress={() => this.setState({ archive: !this.state.archive })} />
            <Appbar.Action icon={require('../Image/Deleted.png')} onPress={() => this.handleDelete()} />
          </View>

          <DialogReminder dialogVisible={this.state.dialogVisible}
            handleCancel={this.handleCancel}
            handleSave={this.handleSaveReminder} />
        </Appbar> */}

        <View style={{ height: '84%', width: '100%', backgroundColor: this.state.bgColor }}>
          <TextInput multiline={true}
            style={styles.input}
            value={this.state.title}
            underlineColorAndroid="transparent"
            placeholder="Title"
            onChangeText={(text) => this.setState({ title: text })}>
          </TextInput>

          <TextInput multiline={true}
            style={styles.input}
            value={this.state.note}
            underlineColorAndroid="transparent"
            placeholder="Note"
            onChangeText={(text) => this.setState({ note: text })}>
          </TextInput>

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
    width: '100%',
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: .1,
    fontSize: 30,



  },
});