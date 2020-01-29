import React, { Component } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Dialog from "react-native-dialog";

export default class DialogReminderr extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dialogVisible: false,
      date: "Select The Date",
      time: "",
      setTime: "Select The Time",
      isDatePickerVisible: false,
      isTimePickerVisible: false,
    };
  }

  convert12hour = (dm) => {
    var timeString = dm;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = (H < 12 || H === 24) ? "AM" : "PM";
    timeString = h + timeString.substr(2, 3) + ampm;
    this.setState({ setTime: timeString })
  }

  _showDatePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleDatePicked = (date) => {

    var mj = JSON.stringify(date)
    var Date1 = mj.slice(1, 11)
    this.setState({ date: Date1 })
  };

  _handleTimePicked = (date) => {
    var d = " " + date
    var dm = d.slice(17, 25)
    this.convert12hour(dm);


    var mj = JSON.stringify(date)
    var Time1 = mj.slice(11, 25)
    this.setState({ time: Time1 })

  };

  handleNotification = () => {
    var date = this.state.date + this.state.time
    var date23 = new Date(date)
    
    if (this.state.time !== null && this.state.date !== null) {
      this.props.handleSave(this.state.date, this.state.setTime, date23)
    }
    else {
      alert('entrer all details')
    }
  }
  render() {
    return (

      <Dialog.Container visible={this.props.dialogVisible}>
        <Dialog.Title>Add Reminder</Dialog.Title>

        <TouchableOpacity onPress={this._showDatePicker}>
          <View style={{ margin: 4, flexDirection: 'row', alignSelf: 'center', backgroundColor: 'transparent', width: 200, borderWidth: 1, height: 40 }}>
            <Image style={{ height: 25, width: 30, margin: 5 }}
              source={require('../Image/Calendar.png')} />
            <Text style={{ margin: 5, fontSize: 17 }}>{this.state.date}</Text>
            <DateTimePicker
              mode='date'
              isVisible={this.state.isDatePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDatePicker}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={this._showTimePicker}>
          <View style={{ margin: 4, flexDirection: 'row', alignSelf: 'center', backgroundColor: 'transparent', width: 200, borderWidth: 1, height: 40 }}>
            <Image style={{ height: 25, width: 30, margin: 5 }}
              source={require('../Image/Alarm1.png')} />
            <Text style={{ margin: 5, fontSize: 17 }}>{this.state.setTime}</Text>
            <DateTimePicker
              mode='time'
              is24Hour={false}
              isVisible={this.state.isTimePickerVisible}
              onConfirm={this._handleTimePicked}
              onCancel={this._hideTimePicker}
            />
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', top: 10, justifyContent: 'flex-end' }}>
          <Dialog.Button label="Save"
            onPress={() => this.handleNotification()
              //this.props.handleSave(this.state.date,this.state.time)
            }
          />
          <Dialog.Button label="Cancle" onPress={this.props.handleCancel} />
        </View>

      </Dialog.Container>

    );
  }
}