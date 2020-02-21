import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from 'native-base';
import Appbar from './AppBar';
import BottomBar from './BottomBar';
import moment from 'moment';
import PushNotification from "react-native-push-notification";
import { styles } from '../CSS/EditeNotes.Style'
import { editNote, setReminder, moveToTrash, editNoteWithImage } from '../Services/FireBaseDb'
//import { editNote, setReminder, moveToTrash } from '../Services/AxiosDb'
import FastImage from 'react-native-fast-image'


export default class EditeNotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: '',
      title: '',
      date: '',
      time: '',
      dateTime: '',
      dataSource: [],
      pin: '',
      archive: '',
      visible: false,
      trash: '',
      currentTime: '',
      bgColor: '',
      image: ''
    }
    this.handleSaveNote = this.handleSaveNote.bind(this);
  }

  handleArchiveStatus = (status) => this.setState({ archive: status });

  handleShowDialog = (status) => { this.setState({ dialogVisible: status }) }

  handleCloseDialog = (status, date, time, dateTime) => { this.setState({ dialogVisible: status, date: date, time: time, dateTime: dateTime }) }

  handlePinStatus = (status) => { this.setState({ pin: status }) }

  handleDelete = () => {
    this.setState({ trash: true }, () => {
      var currentNoteId = this.props.navigation.state.params.currentNoteId
      //firebase method
      moveToTrash(currentNoteId, this.state.trash)
      this.props.navigation.navigate('Notes')
    })
  }

  handleSaveReminder = (status, date, time, dateTime) => {

    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      message: this.state.title, // (required)
      subText: this.state.note,
      date: dateTime // in 60 secs
    });

    this.setState({ date: date })
    this.setState({ time: time }, () => {
      var currentNoteId = this.props.navigation.state.params.currentNoteId
      //firebase Method
      setReminder(currentNoteId, this.state.date, this.state.time)
    })
    this.setState({ dialogVisible: status });
  };

  handleSaveNote = () => {
    console.log("save note");

    if (this.state.note == '' && this.state.title == '') {
      this.props.navigation.navigate('Notes')
    }
    else {
      var currentNoteId = this.props.navigation.state.params.currentNoteId
      //firebase Method
      this.state.image == undefined ?
      editNote(currentNoteId, this.state.title, this.state.note, this.state.pin, this.state.archive, this.state.trash, this.state.bgColor):
        editNoteWithImage(currentNoteId, this.state.title, this.state.note, this.state.pin, this.state.archive, this.state.trash, this.state.bgColor, this.state.image)

      this.props.navigation.navigate('Notes')
    }
  }

  handleImage = (url) => { this.setState({ image: url }); }

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
      this.setState({
        title: this.state.dataSource.Title,
        note: this.state.dataSource.Note,
        pin: this.state.dataSource.Pin,
        archive: this.state.dataSource.Archive,
        trash: this.state.dataSource.Trash,
        bgColor: this.state.dataSource.BgColor,
        image: this.state.dataSource.Image,
      })
    })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Appbar handleSaveNote={this.handleSaveNote}
          handlePinStatus={this.handlePinStatus}
          handleShowDialog={this.handleShowDialog}
          handleCloseDialog={this.handleSaveReminder}
          handleArchiveStatus={this.handleArchiveStatus}
          handleSave={this.handleSaveReminder}
        />

        <View style={{ height: '84%', width: '100%', backgroundColor: this.state.bgColor }}>

          {
            this.state.image !== undefined ?
              <FastImage
                style={{ width: '100%', height: 400 }}
                source={{ uri: this.state.image }}
                resizeMode={FastImage.resizeMode.stretch}
              /> : null
          }

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
        <BottomBar handleBgColour = {this.handleNoteBgColour}
          handleImage={this.handleImage}
          handleCaptureImage={this.handleImage} />
      </View>

    );
  }
}
