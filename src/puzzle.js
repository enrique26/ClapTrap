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
import moment from 'moment'
import Clock from './component/clock';

export default class Puzzle extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <View style={{position:'absolute',top:100,left:150}}>
          <Clock />
        </View>


      </View>
    );
  }
}





const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1300,
    height: 1100,
    backgroundColor: 'rgba(185, 255, 185, 0.4)',
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
  }

});
