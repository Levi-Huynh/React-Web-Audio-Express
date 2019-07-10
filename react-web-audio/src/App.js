import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

import AudioAnalyser from "./AudioAnalyser";
import Chart from "./chart";
import Form from "./ScoresForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.toggleMicrophone = this.toggleMicrophone.bind(this);
  }

  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  toggleMicrophone() {
    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="controls">
            <button onClick={this.toggleMicrophone}>
              {this.state.audio ? "Stop microphone" : "Get microphone input"}
            </button>
          </div>
          {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ""}
          <NavLink className="chartNav" to="/Chart">
            Chart
          </NavLink>
          <NavLink to="/addScore">Add Score From</NavLink>
        </header>
        <main>
          <Route exact path="/addScore" component={Form} />
          <Route exact path="/Chart" component={Chart} />
        </main>
      </div>
    );
  }
}

export default App;
