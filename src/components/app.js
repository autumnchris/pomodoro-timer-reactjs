import React, { Component } from 'react';

const audio = require('.././audio/wink-sound-effect.mp3');

export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>Pomodoro Timer</h1>
        </header>
        <main>
          {/* TIMERS */}
          <div className="timers">
            <div className="timer-card">
              <h2>Work Session</h2>
              <div className="timer">25:00</div>
            </div>
            <div className="timer-card">
              <h2>Break Session</h2>
              <div className="timer">05:00</div>
            </div>
          </div>
          {/* TIMER BUTTONS */}
          <div className="button-group">
            <button type="button" className="timer-button" aria-label="Play" title="Play">
              <span className="fa fa-play fa-2x"></span>
            </button>
            <button type="button" className="timer-button" aria-label="Reset" title="Reset">
              <span className="fa fa-redo-alt fa-2x"></span>
            </button>
          </div>
          {/* AUDIO */}
          <audio src={audio} />
        </main>
        {/* FOOTER */}
        <footer>Coded by <a href="../portfolio" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
