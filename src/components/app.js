import React, { Component } from 'react';

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
        {/* FOOTER */}
        <footer>Coded by <a href="../portfolio" target="_blank">Autumn Bullard</a></footer>
      </div>
    );
  }
}
