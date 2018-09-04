import React, { Component } from 'react';

const audio = require('.././audio/wink-sound-effect.mp3');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalStyle: {display: 'none'},
      errorStyle: {display: 'none'}
    };
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
                    <input type="text" name="workTimerInput" id="work-timer-input" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="break-timer-input">Set Break Time:</label>
                    <input type="text" name="breakTimerInput" id="break-timer-input" required />
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
