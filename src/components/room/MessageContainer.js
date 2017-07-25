import React from 'react';

const MessageContainer = (messageContainer) => {

    const message = messageContainer.messageContainer.map((message) =>
        <li key={message.messageUID}>
            <p className="pemail"> {message.userEmail} </p>
            <p className="ptext"> {message.text} </p>
        </li>
    );

    if (messageContainer.messageContainer == 0) {
        return (
            <div>
                <div className="jumbotron">
                    <p> No Message </p>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="RoomBox">
                    <ul className="ListMessage" id="Middle">
                        {message}
                    </ul>
                </div>
            </div>
        );
    }

};

MessageContainer.propTypes = {
    messageContainer : React.PropTypes.array
};

export default MessageContainer;
