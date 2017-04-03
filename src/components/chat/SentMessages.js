import React from 'react';
import Nick from './Nick';

class SentMessages extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.listen();
  }

  render() {
    return (
      <div>
        <ul style={{listStyleType: 'none'}}>
          {Object.keys(this.props.messages).map(key => {
            return (
              <li 
                key={key}
                style={{margin: "3px"}}
              >
                <Nick nick={this.props.messages[key].nick}/>
                {this.props.messages[key].message}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}


SentMessages.propTypes = {
  auth: React.PropTypes.object.isRequired,
  messages: React.PropTypes.object.isRequired,
  listen: React.PropTypes.func.isRequired
};

export default SentMessages;
