import { StyleSheet } from 'react-native';

export var styles = StyleSheet.create({
    innerView: {
      display: 'flex',
      width: '100%',
      height: '90%',
    },
    subView: {
      width: '100%',
      position: "relative",
      borderColor: 'pink',
      borderWidth: 1,
      backgroundColor: 'white',
      display: 'flex',
    },
    horizontalView: {
      borderColor: 'pink',
      borderWidth: 1,
      backgroundColor: 'red',
      display: 'flex',
    },
    subText: {
      marginLeft: 20
    },
    alaramView: {
      backgroundColor: 'lightblue',
      marginLeft: 7,
      bottom: 15,
      borderWidth: 1,
      width: 180,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    bottom: {
      backgroundColor: 'white',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderWidth: .1,
      width:'100%',
      justifyContent:'space-between'
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
    },
  
    container: {
      flex: 1,
      backgroundColor: "white",
    },
    ListStyle: {
      flex: 1,
      marginVertical: 20,
    },
  });