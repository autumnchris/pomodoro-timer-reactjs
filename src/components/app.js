import React, { Component } from 'react';

const audio = require('.././audio/wink-sound-effect.mp3');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workTimerInput: '',
      breakTimerInput: '',
      workMinutes: null,
      workSeconds: null,
      breakMinutes: null,
      breakSeconds: null,
      modalStyle: {display: 'none'},
      errorStyle: {display: 'none'}
    };
    this.workTimer = JSON.parse(localStorage.getItem('workTimer')) || 1500;
    this.breakTimer = JSON.parse(localStorage.getItem('breakTimer')) || 300;
  }

  setNewTimer() {
    this.setState({
      workTimerInput: this.workTimer / 60,
      breakTimerInput: this.breakTimer / 60,
      workMinutes: parseInt(this.workTimer / 60, 10),
      workSeconds: parseInt(this.workTimer % 60, 10),
      breakMinutes: parseInt(this.breakTimer / 60, 10),
      breakSeconds: parseInt(this.breakTimer % 60, 10)
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  openModal() {
    this.setState({
      modalStyle: {display: 'block'}
    });
  }

  closeModal() {
    this.setState({
      modalStyle: {display: 'none'}
    });
  }

  componentDidMount() {
    this.setNewTimer();

    window.addEventListener('click', (event) => {

      if (event.target.id === 'modal') {
        this.setState({
          modalStyle: {display: 'none'}
        });
      }
    });
  }

  render() {
    return (
      <div className="body">
        {/* HEADER */}
        <header>
          <h1>Pomodoro Timer</h1>
          {/* SETTINGS BUTTON */}
          <button type="button" className="settings" onClick={() => this.openModal()} aria-label="Settings" title="Settings">
            <span className="fa fa-cog"></span>
          </button>
          {/* SETTINGS MODAL */}
          <div id="modal" style={this.state.modalStyle}>
            <div className="modal-content">
              <div className="modal-header">
                <h2>Timer Settings</h2>
              </div>
              <div className="modal-body">
                {/* SETTINGS FORM */}
                <form className="settings-form">
                  <div className="form-group">
                    <label htmlFor="work-timer-input">Set Work Time:</label>
                    <input type="text" name="workTimerInput" onChange={(event) => this.handleChange(event)} value={this.state.workTimerInput} id="work-timer-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="break-timer-input">Set Break Time:</label>
                    <input type="text" name="breakTimerInput" onChange={(event) => this.handleChange(event)} value={this.state.breakTimerInput} id="break-timer-input" required />
                  </div>
                  {/* ERROR MESSAGE */}
                  <p className="message error-message" style={this.state.errorStyle}><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> Please enter numbers between 1 and 60.</p>
                  {/* FORM BUTTONS */}
                  <div className="button-group">
                    <input type="submit" value="Save" />
                    <input type="button" onClick={() => this.closeModal()} value="Cancel" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>
        <main>
          {/* TIMERS */}
          <div className="timers">
            <div className="timer-card">
              <h2>Work Session</h2>
              <div className="timer">{this.state.workMinutes < 10 ? `0${this.state.workMinutes}` : this.state.workMinutes}:{this.state.workSeconds < 10 ? `0${this.state.workSeconds}` : this.state.workSeconds}</div>
            </div>
            <div className="timer-card">
              <h2>Break Session</h2>
              <div className="timer">{this.state.breakMinutes < 10 ? `0${this.state.breakMinutes}` : this.state.breakMinutes}:{this.state.breakSeconds < 10 ? `0${this.state.breakSeconds}` : this.state.breakSeconds}</div>
            </div>
          </div>
          {/* TIMER BUTTONS */}
          <div className="button-group">
            <button type="button" className="timer-button" aria-label="Play" title="Play">
              <span className="fa fa-play fa-lg"></span>
            </button>
            <button type="button" className="timer-button" aria-label="Reset" title="Reset">
              <span className="fa fa-redo-alt fa-lg"></span>
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
