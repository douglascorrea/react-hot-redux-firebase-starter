import React, {Component} from 'react';
import {Link} from 'react-router';

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
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <h2>Counter: {this.state.counter}</h2>
        <Link to="/" activeClassName="active">Go toasdsa Home</Link>
      </div>
    );
  }
}

