import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  VrButton,
  asset,
  Animated
} from 'react-360';
import PointLight from 'PointLight';
import Entity from 'Entity';

const AnimatedEntity = Animated.createAnimatedComponent(Entity);

export default class Deer extends React.Component {
  rotation = new Animated.Value(0);

  componentDidMount(){
    // if (nextProps.current !== this.props.current) {
      this.rotation.setValue(0);
      Animated.timing(this.rotation, {toValue: 360, duration: 20000}).start();
    // }
  }
  /////Entity styles
  /*
 translateX = horizontal axis
 translateY = vertical axis
 translateZ = deep axis
 rotateY = vertical axis
 rotateX = horizontal axis
 rotateZ = center obj axis
 scaleX = decimal de 0 a n  segun el objeto a renderizar
 scaleY = decimal de 0 a n  segun el objeto a renderizar
 scaleZ = decimal de 0 a n  segun el objeto a renderizar
  */
  render() {
    return (
      <View style={styles.panel}>
        <AnimatedEntity source={{obj: asset('./deer.obj')}}
          style={{transform: [
            {rotateY:this.rotation},
            {translateX:0},
            {translateY:-400},
            {translateZ:0},
            {rotateY:50},
            {scaleZ:.5},
            {scaleX:.5},
            {scaleY:.5}
          ]}}/>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 800,
    height: 800,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
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
