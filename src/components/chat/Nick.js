import React, { Component } from 'react';
import Avatar from 'react-avatar';


class Nick extends Component {

  constructor(props, context){
    super(props, context);
  }

  render() {
    const style = {
      marginLeft: 5,
      marginRight: 10,
      color: "#546E7A",
      fontWeight: "bold"
    };

    return (
      <span>
        <Avatar 
          name={this.props.nick}
          size="25"
          round="true"
          textSizeRatio={1.5}
          style={{marginRignt: 5}}
        />
        <span style={style}>
          {this.props.nick}: 
          {' '}
        </span>
      </span>
    );
  }
}

Nick.propTypes = {
	nick: React.PropTypes.string.isRequired
};

export default Nick;