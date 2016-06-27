import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import YouTube from 'react-native-youtube';

class PlayerView extends Component {
  render() {
    return (
      <View>
        <YouTube
          videoId = {this.props.videoID}
          play = {true}
          hidden = {false}
          playsInline = {true}
          onError = {(e) => {alert(e.error)}}
          style = {{
            alignSelf: 'stretch',
            height: 300,
            backgroundColor: 'black',
            marginVertical: 10
          }}
        />
        <TouchableOpacity
          onPress = {() => this.props.navigator.pop()}>
          <Text style = {{color: '#40b2bf'}}>
            Close this Video
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

module.exports = PlayerView;
