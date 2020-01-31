import * as React from 'react';
import { Appbar, Card } from 'react-native-paper';
import { StyleSheet, Image, FlatList, Text, TouchableOpacity, } from 'react-native';
import { View } from 'native-base';
import firebase from '../fireBase/Config'
import { AsyncStorage } from "react-native";
import { styles } from '../CSS/Deleted.Style'
import { Provider, Menu, Divider, Snackbar } from 'react-native-paper';
import { PermanentDelete } from '../Services/FireBaseDb'
// import { PermanentDelete } from '../Services/AxiosDb'

export default class Deleted extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: null,
      toggleDrawer: true,
      dataSource: [],
      numColumns: 1,
      listView: true,
      selectionMode: false,
      selectedData: [],
      permantDelete: false,
      visible: false,
      snakBarvisible: false,
      trash: true,
      noteId: ''

    };
  }
  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  toggleDrawer() { this.props.navigation.toggleDrawer() };

  GridView = () => { this.setState({ ListView: !this.state.ListView }); }

  handleSelectionMode = (mode) => {
    this.setState({ selectionMode: mode })
    this.setState({ selectedData: [] })
  }

  handleRestore = (status) => {
    this.setState({ trash: status }, () => {
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId => (
        firebase.database().ref('/users/' + currentUser + '/Notes/' + currentNoteId).update({
          Trash: this.state.trash,
        })
      ))
    })
  }

  handlePermantDelete = (status) => {
    this.setState({ permantDelete: status }, () => {
      var currentUser = firebase.auth().currentUser.uid
      this.state.selectedData.map(currentNoteId => (
        PermanentDelete(currentNoteId)
      ))
    })
  }

  handleListView = (listView) => {
    this.setState({ listView: listView }, () => {
      if (listView == true) {
        return this.setState({ numColumns: 1 })
      }
      this.setState({ numColumns: 2 })
    })
  }

  handlerLongClick = (noteId) => {
    this.setState({ selectionMode: true }, () => {
    })
    this.handleSelectionNode(noteId)
  };

  handleSelectionNode = (noteId) => {
    if (this.state.selectedData.includes(noteId)) {
      var selectedNode = this.state.selectedData.filter(element => element !== noteId)
      this.setState({ selectedData: selectedNode }, () => {
        if (this.state.selectedData.length == 0) {
          this.setState({ selectionMode: false })
        }
      })
    }
    else {
      var selectedNode = this.state.selectedData.concat(noteId)
      this.setState({ selectedData: selectedNode })
    }
  }

  handleTrash = () => {
    this.setState({ trash: false }, () => {
      var currentUser = firebase.auth().currentUser.uid
      firebase.database().ref('/users/' + currentUser + '/Notes/' + this.state.noteId).update({
        Trash: this.state.trash,
      })
      //  this.props.navigation.navigate('Deleted');
    })
  }

  componentDidMount() {
    AsyncStorage.getItem("UserId", (error, result) => {
      var ref = firebase.database().ref('/users/' + result + '/Notes/')
        .orderByChild('Trash').equalTo(true)
      ref.on('value', (snapshot) => {
        var data = snapshot.val();
        {
          data !== null ?
            this.setState({
              dataSource: data,
              listView: true,
            }, () => {
              Object.keys(this.state.dataSource).map((key) => {
                var Key = key
                var data = this.state.dataSource[key]
                this.state.dataSource[key].noteId = key
              })
            })
            : null
        }


      });
    })
  }

  render() {
    return (

      <View style={{ flex: 1, width: '100%', height: "100%" }}>
        <Snackbar visible={this.state.snakBarvisible}
          duration={3000}
          onDismiss={() => this.setState({ snakBarvisible: false })}
          style={{ backgroundColor: '#020202' }}
          action={{
            label: 'Restore',
            onPress: () => {
              this.handleTrash();
            },
          }}
        >
          Can't edit in Recyle Bin
        </Snackbar>
        <Appbar style={{ backgroundColor: 'white' }} >
          <View style={{ flexDirection: 'row', width: '100%' }}>

            <TouchableOpacity onPress={() => this.toggleDrawer()}>
              <Image source={require('../Asserts/drawer.png')}
                style={{ width: 25, height: 25, margin: 10, tintColor: 'black' }} />
            </TouchableOpacity>

            <Provider>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={{ position: 'relative', height: 'auto', width: 'auto', marginRight: 6 }}
                  onPress={() => {
                    this.setState({ ListView: !this.state.ListView }, () => {
                      console.log("AppBar:" + this.state.ListView);
                      this.handleListView(this.state.ListView)
                    });
                  }}>
                  <Image source={(this.state.ListView) ? require('../Asserts/List4.png') : require('../Asserts/Grid2.png')}
                    style={{ top: 0, width: 25, height: 25, margin: 10 }} />
                </TouchableOpacity>

                <Menu
                  visible={this.state.visible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <Appbar.Action icon={require('../Asserts/More.png')} onPress={this._openMenu} />
                  }>

                  <Menu.Item onPress={() => {
                    this.setState({ permanantDelete: true }, () => {
                      this.handlePermantDelete(this.permanantDelete)
                    })
                  }} title="Permanant Delete" />

                  <Divider />

                  <Menu.Item onPress={() => {
                    this.setState({ trash: false }, () => {
                      this.handleRestore(this.state.trash)
                    })
                  }} title="Restore" />
                </Menu>

              </View>
            </Provider>
          </View>
        </Appbar>

        <View style={{ width: '100%', display: 'flex', height: '84%', backgroundColor: 'white' }}>

          <FlatList
            numColumns={this.state.numColumns} //toggle no of columns
            key={this.state.numColumns}
            data={Object.keys(this.state.dataSource)}
            renderItem={({ item }) =>

              <TouchableOpacity style={{ width: this.state.listView ? '95%' : '45%', height: this.state.listView ? 'auto' : 'auto', margin: 10 }}
                onLongPress={() => this.handlerLongClick(this.state.dataSource[item].noteId)}
                onPress={() => this.state.selectionMode ? this.handleSelectionNode(this.state.dataSource[item].noteId)
                  : this.setState({ snakBarvisible: true, noteId: this.state.dataSource[item].noteId })}
              >
                <View style={{
                  width: '100%', position: "relative", borderColor: '#DDE6E2', borderRadius: 7, borderWidth: 1, display: 'flex',
                  backgroundColor: this.state.selectionMode && this.state.selectedData.includes(this.state.dataSource[item].noteId) ? '#e0ffff' : 'white',
                }}>
                  <View>
                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{"Title :"}</Text>
                    <Text style={styles.subText}>{this.state.dataSource[item].Title}</Text>
                    <Text style={{ fontWeight: 'bold', marginLeft: 10 }}>{"Note :"}</Text>
                    <Text style={styles.subText}>{this.state.dataSource[item].Note}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            }
          />

        </View>
      </View>




    );
  }
}
