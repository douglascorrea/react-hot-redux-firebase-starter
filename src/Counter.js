import React, {Component} from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {counter: 0};
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    this.setState({
      counter: this.state.counter + 2
    });
  }

  render() {
    return (
      <h2>Counter: {this.state.counter}</h2>
    );
  }
}

