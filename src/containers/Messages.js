import { connect } from 'react-redux';
import SentMessages from '../components/chat/SentMessages';
import { listenBroadcast } from '../actions/chatActions';


const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    messages: state.messages
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    listen: () => {
      dispatch(listenBroadcast());
    }
  };
};

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(SentMessages);


export default Messages;
