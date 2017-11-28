import React, { PropTypes } from 'react';
import transform from 'lodash/fp/transform';

class LoadingDots extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {frame: 1};
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({  // eslint-disable-line react/no-did-mount-set-state
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while (dots > 0) {
      text += '.';
      dots--;
    }

    const rightProps = transform({})(
      (result, value, key) => (result[key] = value)
    )(
      Object.keys(this.props).filter(
        key => key !== 'interval' && key !== 'dots'
      )
    );

    return <span {...rightProps}>{text}&nbsp;</span>;
  }
}

LoadingDots.defaultProps = {
  interval: 300, dots: 3
};

LoadingDots.propTypes = {
  interval: PropTypes.number,
  dots: PropTypes.number
};

export default LoadingDots;
