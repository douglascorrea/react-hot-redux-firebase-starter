import React from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as firebaseActions from '../actions/firebaseActions';

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const {user, actions, loading} = this.props;
    return (
      <div className="container-fluid">
        <Header signOut={actions.signOut} user={user} loading={loading} />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes =  {
  children: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(firebaseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
