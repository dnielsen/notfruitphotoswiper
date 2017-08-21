import Expo from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ListView } from 'react-native';

import { Button, Card, Icon } from 'react-native-elements'
import store from 'react-native-simple-store';

import Deck from './src/Deck'
import api from './src/api';


const SCREEN_WIDTH =  Dimensions.get('window').width;
const SCREEN_HEIGHT =  Dimensions.get('window').height;

// test data
DATA = [
  { id: 1, text: "Amanda", age: 28, uri: 'http://f9view.com/wp-content/uploads/2013/10/American-Beautiful-Girls-Wallpapers-Hollywood-Celebs-1920x1200px.jpg' },
  { id: 2, text: 'Emma', age: 29, uri: 'https://i.imgur.com/FHxVpN4.jpg' },
  { id: 3, text: 'Scarlett', age: 25, uri: 'https://i.ytimg.com/vi/GOJZ5TIlc3M/maxresdefault.jpg' },
];

var val = 1;
var counter = 1;


class App extends Component {

  constructor(props) {
    super(props);
    this.renderCard = this.renderCard.bind(this)
    this.onSwipeLeft = this.onSwipeLeft.bind(this)
    this.onSwipeRight = this.onSwipeRight.bind(this)
    this.state = {
      photocards: [],
      photoID: '',
      photoLabel: '',
      photoURL: '',
      photoSwipe: '',
    }
  }

    changeValue(id){
      this.props.changeValue(this.state.id);
          this.setState(photoID: counter);
      }



componentWillMount() {
    api.getInfo().then((res) => {
      this.setState({
        photocards: res[counter-1],
        photoID: res[counter-1].id,
        photoLabel: res[counter-1].label,
        photoURL: res[counter-1].url,
        photoSwipe: res[counter-1].swipe_val,
      })
    });
  }


  
  renderCard(card){
    return (
      <Card
        key={this.state.photoID}
        containerStyle={{borderRadius: 10, width: SCREEN_WIDTH * 0.92, height: SCREEN_HEIGHT - 165}}
        featuredTitle={`${this.state.photoLabel},`}
        featuredTitleStyle={{position: 'absolute', left: 15, bottom: 10, fontSize: 30 }}
        image={{ uri: this.state.photoURL }}
        imageStyle={{borderRadius: 10, width: SCREEN_WIDTH * 0.915, height: SCREEN_HEIGHT - 165}}
      />
    )
    counter++;
    changeValue(counter);
  }

  

  onSwipeRight(card) {
    console.log('Card liked: ' + this.state.photoLabel);
    fetch('http://13.59.110.224:8000/notfruit/' + counter + '/?format=json', {
    method: 'PUT',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({
      swipe_val: '1'
    })
  }).
    then((response) => {
      console.log('Done', response);
    });
    console.log(counter)
    counter++;
  }

  onSwipeLeft(card) {
    console.log('Card disliked: ' + this.state.photoLabel);
    fetch('http://13.59.110.224:8000/notfruit/' + counter + '/?format=json', {
    method: 'PUT',
    headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({
      swipe_val: '2'
    })
  }).
    then((response) => {
      console.log('Done', response);
    });
    console.log(counter)
    counter++;
  }

  renderNoMoreCards() {
    return (
      <Card
        containerStyle={{borderRadius: 10, width: SCREEN_WIDTH * 0.92, height: SCREEN_HEIGHT - 165}}
        featuredTitle="No more cards"
        featuredTitleStyle={{fontSize: 25}}
        image={{ uri: 'https://i.imgflip.com/1j2oed.jpg' }}
        imageStyle={{borderRadius: 10, width: SCREEN_WIDTH * 0.915, height: SCREEN_HEIGHT - 165}}
      />
    )
  }

  render() {
    console.log("PhotoCard", this.state.photoURL)
    console.log(counter)
    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Deck
            data={DATA}
            renderCard={this.renderCard}
            renderNoMoreCards={this.renderNoMoreCards}
            onSwipeRight={this.onSwipeRight}
            onSwipeLeft={this.onSwipeLeft}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(211, 211, 211, 0.4)'
  },
  deck: {
    flex: 1
  },
});

Expo.registerRootComponent(App);
