import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOut } from '~/actions/authActions';

import Header from '~/components/Header';

import * as Ui from './Ui';

class Layout extends React.PureComponent {
  static propTypes =  {
    children: PropTypes.object,
    actions: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  render() {
    const { auth, actions, loading, user } = this.props;
    return (
      <Ui.Container>
        <Header />
        {this.props.children}
      </Ui.Container>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    user: state.user,
    loading: state.ajaxCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({signOut}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
