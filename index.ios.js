'use strict';

import React, {Component} from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

var VideoListView = require('./components/VideoListView');
var PlayerView = require('./components/PlayerView');

class youtube extends Component {
  renderScene(route, nav) {
    if(route.name == 'list') {
      return (
        <VideoListView
          navigator = {nav}
          playlistID="PLF76F25F55798FDBC"
        />
      );
    }
    else {
      return (
        <PlayerView
          navigator = {nav}
          videoID = {route.videoID}
        />
      )
    }
  }
  render() {
    return (
      <Navigator
        style={{flex: 1, backgroundColor: 'black'}}
        initialRoute = {{name: 'list'}}
        renderScene = {this.renderScene}
      />
    );
  }
};

AppRegistry.registerComponent('youtube', () => youtube);
