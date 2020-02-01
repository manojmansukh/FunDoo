import * as React from 'react';
import firebase from '../fireBase/Config'
import { AsyncStorage } from "react-native";
var uid ;

export function getUserId() {
    AsyncStorage.getItem("UserId").then((value) => {
        uid = value        
    })
}

export function removeUserId() {
     uid=''     
}

export function getUserName(callback) {
    const ref = firebase.database().ref('/users/' + uid + '/personal/')
    ref.on('value', (snapshot) => {        
        callback(snapshot.val())
    })
}

export function getNotes(callback) {
    const ref = firebase.database().ref('/users/' + uid + '/Notes/')    .orderByChild('Trash').equalTo(false)
    ref.on('value',(snapshot) => {
        callback(snapshot.val())
    })
}

export function saveNote(title,note,date,time,pin,bgColor){
    var uid = firebase.auth().currentUser.uid
    firebase.database().ref('/users/' + uid + '/Notes/').push({
          Title: title,
          Note: note,
          Date: date,
          Time: time,
          Pin: pin,
          BgColor: bgColor,
          Archive:  false,
          Trash: false,
        })
}

export function editNote(currentNoteId,title,note,pin, archive, trash, bgColor){    
    firebase.database().ref('/users/' + uid + '/Notes/' + currentNoteId).update({
        Title: title,
        Note: note,
        Pin: pin,
        Archive: archive,
        Trash: trash,
        visible: false,
        BgColor: bgColor
      })
}

export function setReminder(currentNoteId,date,time){
    firebase.database().ref('/users/' + uid + '/Notes/' + currentNoteId).update({
        Date: date,
        Time: time,
      })
}

export function setPin(currentNoteId,pin){
    firebase.database().ref('/users/' + uid + '/Notes/' + currentNoteId).update({
        Pin: pin,
      })
}

export function setArchive(currentNoteId,archive){
    firebase.database().ref('/users/' + uid + '/Notes/' + currentNoteId).update({
            Archive: archive  
        })
}

export function moveToTrash(currentNoteId,trash){    
    firebase.database().ref('/users/' + uid + '/Notes/' + currentNoteId).update({
        Trash: trash,
      })
}

export function PermanentDelete(currentNoteId){
    firebase.database().ref('/users/' + uid + '/Notes/' + currentNoteId).remove()

}