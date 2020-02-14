import React, {Component} from 'react'
import {View,Text} from 'react-native'
import FastImage from 'react-native-fast-image'

export default class Stupid extends Component{
    render(){
        return(
            <View>
            <Text> Hello</Text>
                <FastImage
                    style={{ width: 200, height: 200 }}
                    source={{
                        uri: 'https://unsplash.it/400/400?image=1',
                        headers: { Authorization: 'someAuthToken' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}

                />

            </View>
        )
    }
}
    

