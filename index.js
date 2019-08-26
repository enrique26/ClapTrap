import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  VrButton,
  asset,
  Animated,
  NativeModules
} from 'react-360';
import Entity from 'Entity';
import Deer from './src/deer';
import Clock from './src/clock';
import Wolf from './src/wolf';

const { AudioModule } = NativeModules;


const AnimatedEntity = Animated.createAnimatedComponent(Entity);

class Background extends React.Component {
  constructor(props) {
    super();
    Environment.setBackgroundImage(props.uri, {format: props.format});
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.uri !== this.props.uri ||
      nextProps.format !== this.props.format
    ) {
      Environment.setBackgroundImage(nextProps.uri, {format: nextProps.format});
    }
  }

  render() {
    return null;
  }
}

export default class Clap360 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      playing:false,
      volume:0.4
    }
  }
  rotation = new Animated.Value(0);

  // componentDidMount(){
  //   // if (nextProps.current !== this.props.current) {
  //     this.rotation.setValue(0);
  //     Animated.timing(this.rotation, {toValue: 360, duration: 20000}).start();
  //   // }
  // }

  animateStart(){
    this.rotation.setValue(0);
    Animated.timing(this.rotation, {toValue: 360, duration: 20000}).start();
  }

  upVolumne(){
    this.setState( (prevstate,props)=>{
      if((prevstate.volume+0.1) < 1){
        AudioModule.setEnvironmentalParams({
          volume:prevstate.volume+0.1
        })
        return {volume:prevstate.volume+0.1}
      }
    })

  }

  downVolumne(){
    this.setState( (prevstate,props)=>{
      if((prevstate.volume-0.1) > 0.1){
        AudioModule.setEnvironmentalParams({
          volume:prevstate.volume-0.1
        })
        return {volume:prevstate.volume-0.1}
      }
    })
  }

  startMusic(){
    const {playing}=this.state;
    console.log('playing')
    if (playing){
      this.setState({
        playing:false
      });
      AudioModule.stopEnvironmental();
    }else{
      this.setState({
        playing:true
      });
      this.animateStart()
      AudioModule.playEnvironmental({
        source: asset('./Waterflame_Electroman_adventures.mp3'),
        volume: 0.6, // play at 3/10 original volume
      });
    }

  }

  inputPayload(event,inputEvent){
    // console.log(event)
    // console.log(inputEvent)

    if(inputEvent.source == "gamepad_0" && inputEvent.button == 5 && !["repeat","up"].includes(inputEvent.action)){
      this.startMusic();
    }
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
    const {playing}=this.state;
    return (
      <View style={styles.panel} onInput={e => {
        const event = e.nativeEvent; // Extract the value from the runtime
        // event contains the actual event payload, as well as information on
        // which cursor the user was using, and which React tag was targeted
        const inputEvent = event.inputEvent; // Extract the payload
        // inputEvent.button is the raw button index, used to determine what was pressed
        // inputEvent.buttonClass is a field added to some buttons for common actions,
        //   like 'confirm', 'back', 'up', 'down', etc.
        // inputEvent.action is 'up', 'down', or 'repeat'
        // inputEvent.source identifies the button device, such as keyboard, mouse, etc
        this.inputPayload(event,inputEvent)
      }}>
        <AnimatedEntity
          onLayout={(event)=>{console.log(event)}}
          source={{obj: asset('./eyeball.obj'),mtl: asset('./eyeball.mtl')}}
          style={{transform: [
            {rotateY:this.rotation},
            /*///si exite una trasnformacion animada que se actualiza en un eje, el array de trasformaciones
            se mantiene y actualiza elmmismo eje en otra propiedad , por ejemplo:
            una animacion en el eje "Y" para la rotacion, este afectara la posicion en "X" si esta esta declarada
            */
            {translateX:-400},
            {translateY:250},
            {scaleX:50},
            {scaleY:50},
            {scaleZ:50}
          ]}}/>
        <View style={styles.containerBottom}>
          <VrButton style={styles.buttonStart} onClick={()=>{this.startMusic()}}>
            <Text style={styles.textStart}>{playing==true ? "STOP":"START"}</Text>
          </VrButton>
          {
            playing == true &&
            <View style={styles.volumeContainer}>
              <VrButton style={styles.volumeButton} onClick={()=>{this.upVolumne()}}><Text style={styles.textVolumne}>+</Text></VrButton>
              <Text style={styles.textVolumne}>VOLUME</Text>
              <VrButton style={styles.volumeButton} onClick={()=>{this.downVolumne()}}><Text style={styles.textVolumne}>-</Text></VrButton>
            </View>
          }

        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 800,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeContainer:{
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:200,
    backgroundColor:'#607d8b'
  },
  containerBottom:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    height:200,
    width:200
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
  buttonStart:{
    height:100,
    width:100,
    borderRadius:50,
    borderWidth:8,
    borderColor:'white',
    backgroundColor:'red',
    alignItems:'center',
    justifyContent:'center'
  },
  textStart:{
    color:'#fff',
    fontSize:14,
    fontWeight:'bold'
  },
  volumeButton:{
    padding:20,
    height:50,
    width:50,
    backgroundColor:"#8eacbb",
    alignItems:'center',
    justifyContent:'center'
  },
  textVolumne:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  }
});

AppRegistry.registerComponent('Clap360', () => Clap360);
AppRegistry.registerComponent('Deer', () => Deer);
AppRegistry.registerComponent('Clock', () => Clock);
AppRegistry.registerComponent('Wolf', () => Wolf);
