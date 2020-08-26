import React, { Component } from 'react';
import timerDone from '../audio/timer-done.mp3';
import SettingsModal from './settings-modal';

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
      isModalOpen: false,
      settingsFormError: false
    };
    this.timer = null;
    this.workTimer = this.state.workLength * 60;
    this.breakTimer = this.state.breakLength * 60;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
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

    if (this.state.workLength && this.state.breakLength && !isNaN(this.state.workLength) && !isNaN(this.state.breakLength) && this.state.workLength >= 1 && this.state.workLength <= 60 && this.state.breakLength >= 1 && this.state.breakLength <= 60) {
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
        settingsFormError: false
      });
      localStorage.setItem('workTimer', JSON.stringify(this.state.workLength));
      localStorage.setItem('breakTimer', JSON.stringify(this.state.breakLength));
      this.showModal(false);
      document.title = 'Pomodoro Timer';
    }
    else {
      this.setState({
        settingsFormError: true
      });
    }
  }

  showModal(status) {
    this.setState({
      isModalOpen: status
    });
  }

  componentDidMount() {
    window.addEventListener('click', (event) => {

      if (event.target.id === 'modal') {
        this.showModal(false);
      }
    });
  }

  render() {
    return (
      <div className="body">
        <header>
          <div className="settings-button-container">
            <button type="button" className="button settings-button" onClick={() => this.showModal(true)} aria-label="Settings" title="Settings">
              <span className="fa fa-cog"></span>
            </button>
          </div>
          {this.state.isModalOpen ? <SettingsModal workLength={this.state.workLength} breakLength={this.state.breakLength} handleChange={this.handleChange} handleSubmit={this.handleSubmit} settingsFormError={this.state.settingsFormError} showModal={this.showModal} /> : null}
          <h1>Pomodoro Timer</h1>
        </header>
        <main>
          <div className="timer-card">
            <h2>{`${this.state.currentSession} Session`}</h2>
            <div className="timer">{this.state.currentMinutes < 10 ? `0${this.state.currentMinutes}` : this.state.currentMinutes}:{this.state.currentSeconds < 10 ? `0${this.state.currentSeconds}` : this.state.currentSeconds}</div>
          </div>
          <div className="button-group timer-buttons">
            <button type="button" className="button timer-button" onClick={this.state.currentButton.func} aria-label={this.state.currentButton.title} title={this.state.currentButton.title}>
              <span className={`fa ${this.state.currentButton.icon} fa-lg`}></span>
            </button>
            <button type="button" className="button timer-button" onClick={() => this.resetTimer()} aria-label="Reset" title="Reset">
              <span className="fa fa-redo-alt fa-lg"></span>
            </button>
          </div>
          <audio src={timerDone} className="audio" />
        </main>
        <footer>Created by <a href="https://autumnbullard-portfolio.herokuapp.com" target="_blank">Autumn Bullard</a> &copy; {new Date().getFullYear()}</footer>
      </div>
    );
  }
}
