import React, { Component } from "react";
import { View, Text, Button, Image } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import { List, ListItem, ListExpand} from 'material-bread';

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
export default class ImagePickerActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filepath: {
                data: '',
                uri: ''
            },
            fileData: '',
            fileUri: ''
        }
    }
    launchCamera = () => {
        
        ImagePicker.launchCamera(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                });
            }
        });

    }
    launchImageLibrary = () => {
       
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response>>>>>>>>>>>>>>>>>>>>>>>>>>>', JSON.stringify(response));
                this.setState({
                    filePath: response,
                    fileData: response.data,
                    fileUri: response.uri
                },()=>{
                    this.props.handleImage(this.state.fileUri)
                });
            }
        });

    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Icon name={'plus-box-outline'}
                    size={22}
                    onPress={() => {
                        this.RBSheet.open();
                    }}
                />
                <RBSheet
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={270}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: 'space-around',
                            alignItems: 'flex-start'
                        }
                    }}
                >
                    <List style={{ width: 500 }}>
                        <ListItem
                            text={'Take Photo'}
                            onPress={this.launchCamera}
                            icon={<Icon name={'camera-outline'} size={25}
                            />}
                        />
                        
                        <ListItem
                            text={'Choose image'}
                            onPress={this.launchImageLibrary}
                            icon={<Icon name={'image'} size={25} />}
                        />
                        <ListItem
                            text={'Drawing'}
                            icon={<Icon name={'brush'} size={25} />}
                        />
                        <ListItem
                            text={'Recording'}
                            icon={<Icon name={'microphone-outline'} size={25} />}
                        />
                        <ListItem
                            text={'Tick boxes'}
                            icon={<Icon name={'check-box-outline'} size={25} />}
                        />   
                    </List>
                </RBSheet>
            </View>
        );
    }
}

const YourOwnComponent = () => <Text>Your Pretty Component Goes Here</Text>;
 