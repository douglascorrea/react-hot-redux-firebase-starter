/*eslint no-invalid-this: "error"*/
/*eslint-env es6*/
import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import toastr from 'toastr';

export default function (ComposedComponent){
  class Authentication extends Component {
    componentWillMount(){
      if(!this.props.authenticated) {
        this.context.router.push('/login');
        toastr.error('You need to be logged to access this page');
      }
    }
    componentWillUpdate(nextProps){
      if(!nextProps.authenticated) {
        this.context.router.push('/login');
        toastr.error('You need to be logged to access this page');
      }
    }
    render(){
              return <ComposedComponent {...this.props}/>;
      }
  }
  Authentication.contextTypes = {
      router : PropTypes.object
    };
  Authentication.propTypes  = {
    authenticated : PropTypes.bool
  };
  const mapStateToProps = (state) => ({
    authenticated : state.auth.isLogged
  });
  return connect(mapStateToProps)(Authentication);
}
