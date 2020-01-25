import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { Appbar, FAB, Portal, Provider , Menu} from 'react-native-paper';
import DialogReminder from './DialogReminder'


export default class BottomBar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      bgColor:'',
      visible: false,
      dialogVisible: false,
      pin:'',
      archive:'',
      date:'',
      time:'',
    }
  }
  showDialog = () => {
    console.log('mj');
    this.setState({ dialogVisible: true }, () => {
      console.log('Hiii' + this.state.dialogVisible);
      this.props.handleShowDialog(this.state.visible)
    });
  };
  handleSave = (date, time, dateTime) => {
    console.log("dateTime:>>>>>>>>>>>", dateTime);
    console.log(date, time)
    this.setState({ date: date, time: time, dateTime: dateTime })
    this.setState({ dialogVisible: false }, 
        () => {this.props.handleCloseDialog(this.state.dialogVisible,this.state.date,this.state.time)
    });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };


  render() {
    return (
        <Appbar style={styles.top}>
        <Appbar.Action icon={require('../Image/arrow_back.png')}
          onPress={() => {
            this.props.handleSaveNote()
          }
          } />
        <View style={{ flexDirection: 'row', flex: 1, alignSelf: 'flex-end', justifyContent: 'flex-end' }}>
          <Appbar.Action icon={this.state.pin ? require('../Image/pin.png') : require('../Image/unpin.png')}
            onPress={() => this.setState({ pin: !this.state.pin }, () => { this.props.handlePinStatus(this.state.pin)})} />
          <Appbar.Action icon={require('../Image/bell1.png')} onPress={this.showDialog} />
          <Appbar.Action icon={this.state.archive ? require('../Image/Archive.png') : require('../Image/Unarchive.png')}
            onPress={() => this.setState({ archive: !this.state.archive }, () => { this.props.handleArchiveStatus(this.state.archive)})} />
          <Appbar.Action icon={require('../Image/Deleted.png')} onPress={() => this.handleDelete()} />
        </View>

        <DialogReminder dialogVisible={this.state.dialogVisible}
          handleCancel={this.handleCancel}
          handleSave={this.handleSave} />
      </Appbar>
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
    }
  });
