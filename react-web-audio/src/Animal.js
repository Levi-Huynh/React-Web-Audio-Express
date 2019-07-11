import React, { Component } from "react";
import moment from "moment";

class Animal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: 3,
      animal: false,
      chart: {
        points: 100,
        date: new Date()
      }
      // flag: 3,
      // points: 100,
      // date: new Date()
    };
  }

  componentWillUnmount() {}

  Setup() {
    setInterval(() => this.StartTimerLowThresh, 3000);
    console.log(this.state.flag);
  }

  StartTimerLowThresh() {
    //  setTimeout(this.lowThresh, 2000);
    const { audioData } = this.props;
    // console.log(audioData[0]);

    // function loop(audioData) {
    //     var i = 0;
    //     var ref = setInterval(() => {
    //         if(audioData[i] === 128 || 127) {
    //             this.setState({
    //                 flag: 2,

    //             });
    //         }else {
    //             this.setState(prevState)({
    //                 flag:1,
    //                 points: prevState.points -5
    //             });
    //         }

    //     }, 6000);
  }

  StopTimerLowThres() {
    clearInterval(this.timer);
    clearInterval(this.StartmediumThresh);
    this.setState(prevState => {
      return {
        flag: 3,
        chart: { ...prevState.chart }
      };
    });
    console.log("flag unmnount:", this.state.flag);
  }

  // StartmediumThresh() {
  //     const{audioData} = this.props;
  //     for (const item of audioData){
  //       let now = new Date();
  //       let nextHour = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 1, 0, 0, 0);
  //       let difference = nextHour - now;
  //    this.timer = setInterval(() => {

  //     if(item > 129) {

  //         this.setState(prevState => {
  //             let newChart= {points: prevState.points-1, date: new Date()};

  //           return {
  //             flag: 2,
  //         //   chart: {...prevState.chart, points: prevState.points -5, date: new Date()}
  //         points: prevState.points -5,
  //         date: new Date()

  //           };
  //         });
  //         } else  {

  //                 this.setState({flag: 1});

  //               //}}, difference
  //         }}, 3000
  //    );

  // }
  // console.log("running:", this.state.flag, this.state.points, this.state.date);

  // }

  StartmediumThresh() {
    const { audioData } = this.props;
    for (const item of audioData) {
      let now = new Date();
      let nextHour = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours() + 1,
        0,
        0,
        0
      );
      let difference = nextHour - now;
      this.timer = setInterval(() => {
        if (item > 128) {
          this.setState(prevState => {
            let newChart = {
              points: (prevState.chart.points -= 1),
              date: new Date()
            };
            return {
              flag: 1,
              chart: { ...prevState.chart, newChart }
              // points: prevState.points -5,
              // date: new Date()
            };
          });
        } else if (item <= 128) {
          this.setState(prevState => {
            return {
              flag: 2,
              chart: { ...prevState.chart }
            };
          }); //set state

          //}}, difference
        } //conditional
      }, 3000);
      console.log("running:", "flag:", this.state.flag, this.state.chart);
    }
  }

  startAnimalTimer() {
    this.animalTimer = setInterval(
      () => this.setState({ animal: true }),
      15000
    );
    this.animalOff = setInterval(() => this.setState({ animal: false }), 70000);
    console.log(
      "animalTimerOn:",
      this.state.flag,
      this.state.chart,
      "animal state:",
      this.state.animal
    );
  }

  render() {
    console.log(
      "outside function:",
      this.state.flag,
      this.state.chart,
      "animal:",
      this.state.animal
    );

    //    console.log("outside function:", this.state.chart);
    return (
      <div>
        <button onClick={this.startAnimalTimer.bind(this)}>
          Initiate Animal
        </button>
        <button onClick={this.StartmediumThresh.bind(this)}>
          Start Low Thres Timer
        </button>
        <button onClick={this.StopTimerLowThres.bind(this)}>
          Stop Low Thres Timer
        </button>
        <h3>{this.state.points}</h3>
        <div
          className={
            this.state.flag === 2 && this.state.animal == true ? "Bear" : null
          }
        />
      </div>
    );
  }
}

export default Animal;
