import React, { Component } from 'react';
import { Text } from 'react-native';
import { Appbar, FAB, Portal, Provider, Menu } from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'
import moment from 'moment';

export default class BottomBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bgColor: '',
      visible: false,
      currentTime:''
    }
  }
  
  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

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
      <Provider>
        <Appbar.Header style={{ backgroundColor: 'white', justifyContent: 'space-between' }}>
          <Appbar.Action icon={require('../Image/AddBox.png')} style={{}} onPress={this._handleMore} />
          <Text>Edited {this.state.currentTime}</Text>
          <Menu
            visible={this.state.visible}
            onDismiss={this._closeMenu}
            style={{ width: '97%' }}
            anchor={
              <Appbar.Action icon="dots-vertical" onPress={this._openMenu} />}>
            <Menu.Item icon={require('../Image/Deleted.png')}
              onPress={() => { console.log("item1"); }} title="Delete" />
            <Menu.Item icon={require('../Image/Copy.png')}
              onPress={() => { console.log("item2"); }} title="Make a Copy" />
            <Menu.Item icon={require('../Image/Send.png')}
              onPress={() => { console.log("item3"); }} title="Send" />
            <Menu.Item icon={require('../Image/Collaborator.png')}
              onPress={() => { console.log("item3"); }} title="Collaborator" />
            <Menu.Item icon={require('../Image/Label.png')}
              onPress={() => { console.log("item3"); }} title="Labels" />
            <ColorPalette
              title=''
              onChange={color => this.setState({ bgColor: color }, () => { this.props.handleBgColour(this.state.bgColor) })}
              defaultColor={'#ffff'}
              colors={[
                '#ffffff', '#f28b82', 
                '#fbbc04', '#fff475',
                '#ccff90', '#a7ffeb', 
                '#d7aefb', '#fdcfe8'
              ]}
            />
          </Menu>
        </Appbar.Header>
      </Provider>
    );
  }
}

