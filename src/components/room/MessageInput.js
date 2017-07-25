import React from 'react';
import TextInput from '../common/TextInput';

const MessageInput = ({ text, onSave, onChange, saving }) => {
    return (
        <form>
            <TextInput
                name = "text"
                label = "Message"
                onChange = {onChange}
                value = {text} />

            <input
                type="submit"
                disabled={saving}
                value={saving ? 'Sending...' : 'Send'}
                className="btn btn-primary"
                onClick={onSave} />
        </form>
    );
};

MessageInput.propTypes = {
    onSave : React.PropTypes.func.isRequired,
    saving : React.PropTypes.bool,
    text : React.PropTypes.string,
    onChange : React.PropTypes.func.isRequired
};

export default MessageInput;
