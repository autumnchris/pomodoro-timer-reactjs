import React, { Component } from 'react';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      workLength: JSON.parse(localStorage.getItem('workTimer')) || 25,
      breakLength: JSON.parse(localStorage.getItem('breakTimer')) || 5,
      currentMinutes: JSON.parse(localStorage.getItem('workTimer')) || 25,
      currentSeconds: 0,
      currentSession: 'Work',
      currentButton: {
        func: () => this.countDown(),
        icon: 'fa-play',
        title: 'Play'
      },
      modalStyle: {display: 'none'},
      errorStyle: {display: 'none'}
    };
    this.timer = null;
    this.workTimer = this.state.workLength * 60;
    this.breakTimer = this.state.breakLength * 60;
    this.playTimer = this.playTimer.bind(this);
  }

  countDown() {
    this.timer = setInterval(this.playTimer, 1000);
    this.setState({
      currentButton: {
        func: () => this.pauseTimer(),
        icon: 'fa-pause',
        title: 'Pause'
      }
    });
  }

  playTimer() {

    if (this.workTimer > 0) {
      this.workTimer--;
      this.setState({
        currentMinutes: parseInt(this.workTimer / 60, 10),
        currentSeconds: parseInt(this.workTimer % 60, 10)
      });
    }
    else {

      if (this.breakTimer === this.state.breakLength * 60 && this.state.currentMinutes === 0 && this.state.currentSeconds === 0) {
        document.querySelector('.audio').play();
        this.setState({
          currentMinutes: this.state.breakLength,
          currentSeconds: 0,
          currentSession: 'Break'
        });
      }
      else {

        if (this.breakTimer > 0) {
          this.breakTimer--;
          this.setState({
            currentMinutes: parseInt(this.breakTimer / 60, 10),
            currentSeconds: parseInt(this.breakTimer % 60, 10)
          });
        }
        else {
          document.querySelector('.audio').play();
          clearInterval(this.timer);
          this.workTimer = this.state.workLength * 60;
          this.breakTimer = this.state.breakLength * 60;
          this.setState({
            currentMinutes: parseInt(this.workTimer / 60, 10),
            currentSeconds: parseInt(this.workTimer % 60, 10),
            currentSession: 'Work'
          });
          this.countDown();
        }
      }
    }
    document.title = `${this.state.currentSession} – ${this.state.currentMinutes < 10 ? '0' + this.state.currentMinutes : this.state.currentMinutes}:${this.state.currentSeconds < 10 ? '0' + this.state.currentSeconds : this.state.currentSeconds}`;
  }

  pauseTimer() {
    clearInterval(this.timer);
    document.querySelector('.audio').pause();
    this.setState({
      currentButton: {
        func: () => this.countDown(),
        icon: 'fa-play',
        title: 'Play'
      }
    });
  }

  resetTimer() {
    clearInterval(this.timer);
    document.querySelector('.audio').pause();
    document.querySelector('.audio').currentTime = 0;
    this.workTimer = this.state.workLength * 60;
    this.breakTimer = this.state.breakLength * 60;
    this.setState({
      currentMinutes: this.state.workLength,
      currentSeconds: 0,
      currentSession: 'Work',
      currentButton: {
        func: () => this.countDown(),
        icon: 'fa-play',
        title: 'Play'
      }
    });
    document.title = 'Pomodoro Timer';
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!isNaN(this.state.workLength) && !isNaN(this.state.breakLength) && this.state.workLength >= 1 && this.state.workLength <= 60 && this.state.breakLength >= 1 && this.state.breakLength <= 60) {
      clearInterval(this.timer);
      this.workTimer = this.state.workLength * 60;
      this.breakTimer = this.state.breakLength * 60;
      this.setState({
        currentMinutes: this.state.workLength,
        currentSeconds: 0,
        currentSession: 'Work',
        currentButton: {
          func: () => this.countDown(),
          icon: 'fa-play',
          title: 'Play'
        },
        errorStyle: {display: 'none'}
      });
      localStorage.setItem('workTimer', JSON.stringify(this.state.workLength));
      localStorage.setItem('breakTimer', JSON.stringify(this.state.breakLength));
      this.closeModal();
      document.title = 'Pomodoro Timer';
    }
    else {
      this.setState({
        errorStyle: {display: 'block'}
      });
    }
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
          <div className="settings-button-container">
            <button type="button" className="button settings-button" onClick={() => this.openModal()} aria-label="Settings" title="Settings">
              <span className="fa fa-cog"></span>
            </button>
          </div>
          <h1>Pomodoro Timer</h1>
        </header>
        <main>
          {/* SETTINGS MODAL */}
          <div className="modal" id="modal" style={this.state.modalStyle}>
            <div className="modal-content">
              <div className="modal-header">Set Custom Timer (in minutes)</div>
              <div className="modal-body">
                <form className="settings-form" onSubmit={(event) => this.handleSubmit(event)}>
                  <div className="form-group">
                    <label htmlFor="work-length">Work:</label>
                    <input type="text" name="workLength" onChange={(event) => this.handleChange(event)} value={this.state.workLength} id="work-length" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="break-length">Break:</label>
                    <input type="text" name="breakLength" onChange={(event) => this.handleChange(event)} value={this.state.breakLength} id="break-length" required />
                  </div>
                  <p className="message error-message" style={this.state.errorStyle}><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> Please enter a number between 1 and 60.</p>
                  <div className="button-group">
                    <input type="submit" className="button modal-button" value="Save" />
                    <input type="button" className="button modal-button cancel" onClick={() => this.closeModal()} value="Cancel" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* TIMER */}
          <div className="timer-card">
            <h2>{`${this.state.currentSession} Session`}</h2>
            <div className="timer">{this.state.currentMinutes < 10 ? `0${this.state.currentMinutes}` : this.state.currentMinutes}:{this.state.currentSeconds < 10 ? `0${this.state.currentSeconds}` : this.state.currentSeconds}</div>
          </div>
          {/* TIMER BUTTONS */}
          <div className="button-group timer-buttons">
            <button type="button" className="button timer-button" onClick={this.state.currentButton.func} aria-label={this.state.currentButton.title} title={this.state.currentButton.title}>
              <span className={`fa ${this.state.currentButton.icon} fa-lg`}></span>
            </button>
            <button type="button" className="button timer-button" onClick={() => this.resetTimer()} aria-label="Reset" title="Reset">
              <span className="fa fa-redo-alt fa-lg"></span>
            </button>
          </div>
          {/* AUDIO */}
          <audio src="https://dl.dropbox.com/s/nacdk0xey4io5d8/wink-sound-effect.mp3" className="audio" />
        </main>
        {/* FOOTER */}
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </div>
    );
  }
}
