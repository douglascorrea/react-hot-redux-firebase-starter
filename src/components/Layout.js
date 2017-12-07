import React from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../actions/authActions';

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {auth, actions, loading, user} = this.props;

    if(this.props.location.pathname === "/chat") {
      return (
        <div>
          <div className="chatHeader">
            <div className="container-fluid">
              <Header signOut={actions.signOut} auth={auth} loading={loading} user={user} />
            </div>
          </div>
          {this.props.children}
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <Header signOut={actions.signOut} auth={auth} loading={loading} user={user} />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes =  {
  children: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  location: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    user: state.user,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({signOut}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
