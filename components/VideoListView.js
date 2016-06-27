import React, {Component} from 'react';
import {
  ScrollView,
  Image,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
var DOMParser = require('xmldom').DOMParser;


class VideoListView extends Component{
  constructor(props) {
    super(props);
    this.state = {
      videos: []
    };
  }
  parseVideos(s) {
    console.log('Parsing the feed...');
    var doc = new DOMParser().parseFromString(s, 'text/xml');
    var objs = [];
    var videos = doc.getElementsByTagName('yt:videoId');
    var thumbs = doc.getElementsByTagName('media:thumbnail');
    var names = doc.getElementsByTagName('title');
    for (var i=0; i < videos.length; i++) {
      objs.push({
        id: videos[i].textContent,
        thumbnail: thumbs[i].getAttribute('url'),
        name: names[i].textContent
      })
    }
    this.setState({videos: objs});
  }
  fetchVideos() {
    console.log('Fetching video feed...');
    var url = 'https://www.youtube.com/feeds/videos.xml' +
      "?playlist_id=" + this.props.playlistID;
    fetch(url)
      .then((response) => response.text())
        .then((responseText) => {
          this.parseVideos(responseText);
        })
        .catch((error) => {
          console.log('Error fetching the feed: ' + error);
        });
  }
  componentDidMount() {
    this.fetchVideos();
  }
  onPressVideo(videoID) {
    console.log('Pressed video: ' + videoID);
    this.props.navigator.push({
      name: 'player',
      videoID: videoID
    });
  }
  render() {
    return (
      <ScrollView>
        {
          this.state.videos.map(video => {
            return (
              <View>
                <Text style = {{color: '#40b2bf'}}>
                  {video.name}
                </Text>
                <TouchableOpacity onPress={() => this.onPressVideo(video.id)}>
                  <Image
                    source = {{uri: video.thumbnail}}
                    style = {{height: 280}}
                    resizeMode = {Image.resizeMode.cover}
                  />
                </TouchableOpacity>
              </View>
            )
          })
        }
      </ScrollView>
    );
  }
};

module.exports = VideoListView;
