import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import DialogReminder from './DialogReminder'
import { styles } from '../CSS/AppBar.Style'
import Icon from 'react-native-vector-icons/FontAwesome';
export default class BottomBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bgColor: '',
      visible: false,
      dialogVisible: false,
      pin: '',
      archive: '',
      date: '',
      time: '',
      dateTime:'',
    }
  }

  showDialog = () => {
    this.setState({ dialogVisible: true }, () => {
      this.props.handleShowDialog(this.state.visible)
    });
  };

  handleSave = (date, time, dateTime) => {
    console.log(date, time)
    this.setState({ date: date, time: time, dateTime: dateTime })
    this.setState({ dialogVisible: false },
      () => {
        this.props.handleCloseDialog(this.state.dialogVisible, this.state.date, this.state.time, this.state.dateTime)
      });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
      <Appbar style={styles.top}>
        <Appbar.Action icon={"arrow-left"}
          onPress={() => {
            this.props.handleSaveNote()
          }} />
        <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
          <Appbar.Action icon={this.state.pin ? "pin" : "pin-outline"}
            onPress={() => this.setState({ pin: !this.state.pin }, () => { this.props.handlePinStatus(this.state.pin) })} />
          <Appbar.Action icon={"bell-plus-outline"} onPress={this.showDialog} />
          <Appbar.Action icon={this.state.archive ? require('../Asserts/Unarchive.png') : require('../Asserts/Archive.png')}
            onPress={() => this.setState({ archive: !this.state.archive }, () => { this.props.handleArchiveStatus(this.state.archive) })} />
          
          {/* <Appbar.Action icon={require('../Asserts/Deleted.png')} onPress={() => this.handleDelete()} /> */}
        </View>

        <DialogReminder dialogVisible={this.state.dialogVisible}
          handleCancel={this.handleCancel}
          handleSave={this.handleSave} />

      </Appbar>
    );
  }
}

