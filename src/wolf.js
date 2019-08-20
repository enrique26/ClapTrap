import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  VrButton,
  asset
} from 'react-360';
import Entity from 'Entity';

export default class Wolf extends React.Component {

  render() {
    return (
      <View style={styles.panel}>
        <Entity source={{obj: asset('./wolf.obj')}}
        style={{transform: [{translateX:-100},{translateY:-400},{translateZ:0},{rotateY:60}]}}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 800,
    height: 800,
    // backgroundColor: 'rgba(185, 255, 185, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: '#000000',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
});
