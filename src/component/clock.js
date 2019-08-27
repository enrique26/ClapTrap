import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Environment,
  VrButton,
  Image,
  asset
} from 'react-360';
import moment from 'moment'


export default class Clock extends React.Component {


  constructor(props){
    super(props)
    this.state=
    {
      time: "00:00:00",
      amPm: "am",
      timer: 0,
      isOn: false,
      start: 0
    }

  }

  componentDidMount() {
    // this.loadInterval = setInterval(
    //   this.getTime.bind(this), 1000
    // );
  }
  updateClock(t,amPm){
    this.setState({
      time: t,
      amPm: amPm
    });
  }

  getTime() {
    const
      takeTwelve = n => n > 12 ?  n  - 12 : n,
         addZero = n => n < 10 ? "0" +  n : n;

    setInterval(() => {
        let d, h, m, s, t, amPm;

      d = new Date();
      h = addZero(takeTwelve(d.getHours()));
      m = addZero(d.getMinutes());
      s = addZero(d.getSeconds());
          t = `${h}:${m}:${s}`;

      amPm = d.getHours() >= 12 ? "pm" : "am";

      this.updateClock(t,amPm)
    }, 1000);
  }

  async startTimer() {
    await this.resetTimer();
    this.setState({
      isOn: true,
      timer: this.state.timer,
      start: Date.now() - this.state.timer
    })
    this.timer = setInterval(() => this.setState({
      timer: this.state.timer + 1
    }), 1000);
  }

  stopTimer() {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer() {
    this.setState({timer: 0, isOn: false})
  }

  render() {
    // const timer = moment(this.state.timer,"HH:mm:ss").format()

    var seconds = moment.duration(this.state.timer, 'seconds').seconds();
    var minutes = moment.duration(this.state.timer, 'seconds').minutes();
    var hours = moment.duration(this.state.timer, 'seconds').hours();
    var timer = (hours < 10 ? "0"+hours:hours) +":"+(minutes < 10 ? "0"+minutes:minutes)+":"+(seconds < 10 ? "0"+seconds:seconds)

    return (
      <View style={stylesClock.panel}>
      <Image style={stylesClock.outer} source={asset('gradient1.jpg')}>
        <Image style={stylesClock.inner} source={asset('gradient2.jpg')}>
          {/*<Text style={styles.time}>
          this.state.time}</Text>
          */}
          <Text style={stylesClock.time}>{timer}</Text>
        </Image>
        <Image style={stylesClock.mostInner} source={asset('gradientButton1.png')}>

          {/*<Text style={styles.amPm}>{this.state.amPm}</Text>*/}
            <VrButton onClick={()=>{ this.state.isOn ? this.stopTimer():this.startTimer()}}>
              <Text style={stylesClock.amPm}>{this.state.isOn ? "Stop":"Start"}</Text>
            </VrButton>
        </Image>

      </Image>
      </View>
    );
  }
}



const stylesClock = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 400,
    height: 400,
    backgroundColor: 'rgba(185, 255, 185, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outer:{
    position: "relative",
    alignItems:'center',
    display: "flex",
    // left: 200,
    // marginLeft: -200,
    height: 270,
    width: 400,
    borderRadius: 200,
    backgroundColor: "orange"
  },
  inner :{
    height: 150,
    width: 300,
    borderRadius: 90,
    marginTop: 60,
    // marginLeft: 50,
    // marginRight: 50,
    backgroundColor:'black',
    justifyContent:'center',
    flexDirection:"column"
  },
  mostInner :{
    height: 70,
    width: 80,
    borderRadius: 40,
    marginTop: -20,
    marginLeft: 120,
    // backgroundColor: 'red',
    justifyContent:'center'
  },

  time:{
    textAlign: "center",
    color: "white",
    fontSize: 60,
    alignSelf:'center'
  },

  amPm :{
    position: "relative",
    // display: "flex",
    alignSelf:"center",
    // marginTop: -5,
    color: "white",
    fontSize: 22,
    fontWeight:'bold'
  }
})
