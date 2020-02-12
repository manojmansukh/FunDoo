import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Provider, Menu, Divider } from 'react-native-paper';
import ColorPalette from 'react-native-color-palette'
import { styles } from '../CSS/AppBarSelectedNotes.Style'

export default class AppBarSelectedNotes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            ListView: true,
            selectionMode: true,
            pin: false,
            archive: false,
            visible: false,
            permanantDelete: false,
            trash: false,
            displayColorPicker: false,
        }
    }

    _openMenu = () => this.setState({ visible: true });

    _closeMenu = () => this.setState({ visible: false });

    handleClick = () => { this.setState({ displayColorPicker: !this.state.displayColorPicker }) };

    handleClose = () => { this.setState({ displayColorPicker: false }) };



    render() {
        return (
            <Appbar style={styles.top}>

                <Appbar.Action icon={"arrow-left"}
                    onPress={() => {
                        this.setState({ selectionMode: false }, () => {
                            console.log(this.state.selectionMode);
                            this.props.handleSelectionMode(this.state.selectionMode)
                        })
                    }} />

                <Provider>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end',top:3 }}>

                        <Appbar.Action icon={this.state.pin ? "pin" : "pin-outline"}
                            onPress={() => this.setState({ pin: !this.state.pin }, () => {
                                this.props.handlePinStatus(this.state.pin)
                            })} />
                        <Appbar.Action icon={"bell-plus-outline"}
                            onPress={this.showDialog} />
                        <Appbar.Action icon={require('../Asserts/ColourBoard.png')}
                            onPress={this.handleClick} />
                        {this.state.displayColorPicker ?
                            <ColorPalette
                                colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
                                title={"Controlled Color Palette:"}
                            /> : null}
                        <Appbar.Action icon={"label"}
                            onPress={() => { }} />

                        <Menu
                            visible={this.state.visible}
                            onDismiss={this._closeMenu}
                            style={{ width: '50%' }}
                            anchor={
                                <Appbar.Action icon={require('../Asserts/More.png')} onPress={this._openMenu} />
                            }>

                            <Menu.Item onPress={() => {
                                this.setState({ archive: !this.state.archive }, () => {
                                    this.props.handleArchive(this.state.archive)
                                })
                            }} title="Archive" />

                            <Menu.Item onPress={() => {
                                this.setState({ trash: true }, () => {
                                    this.props.handleTrash(this.state.trash)
                                })
                            }} title="Delete" />

                            <Divider />
                            <Menu.Item onPress={() => {
                                this.setState({ permanantDelete: true }, () => {
                                    this.props.handlePermantDelete(this.state.permanantDelete)
                                })
                            }} title="Permanant Delete" />

                            <Divider />
                            <Menu.Item onPress={() => { }} title="Make Copy" />
                            <Menu.Item onPress={() => { }} title="Send" />
                        </Menu>
                    </View>
                </Provider>
            </Appbar>



        );
    }
}
