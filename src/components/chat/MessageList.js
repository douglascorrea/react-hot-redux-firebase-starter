/* eslint react/jsx-no-bind: 0 */
import React from 'react';
import shortid from 'shortid';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';

@observer
export default class MessageList extends React.Component {

    componentDidUpdate() {
        const scrollHeight = this.chatContainer.scrollHeight;
        const height = this.chatContainer.clientHeight;
        const maxScrollTop = scrollHeight - height;
        this.chatContainer.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }

    render() {

        return (
            <div className="container-fluid">
                <div 
                    className="chatContainer"
                    ref={e => this.chatContainer = e}
                >
                    {(this.props.messages.map((row) => {

                        let className = "row";

                        if (row.user === this.props.user.email) {
                            className = "row end-xs userMessage";
                        }

                        return (
                            <div className={className} key={shortid.generate()}>
                                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 messageContainer" >
                                    <div className="bubble">{row.message}</div>
                                    <div className="username">{row.user}</div>
                                </div>
                            </div>
                        );
                    }))}
                </div>

                <style jsx>
                    {`
                        .chatContainer {
                            height: 80vh;
                            overflow-y: scroll;
                            overflow-x: hidden;
                        }

                        .chatContainer::-webkit-scrollbar { 
                            display: none; 
                        }

                        .messageContainer {
                            margin-top: 10px;
                            margin-bottom: 10px;
                        }

                        .username {
                            margin-top: 5px;
                            font-size: 12px;
                            color: #aeaeae;
                        }

                        .bubble {
                            background-color: #e4e4e4;
                            border-radius: 5px;
                            padding: 10px 20px;
                        }

                        .userMessage .bubble {
                            background-color: #0084ff;
                            color: white;
                        }
                    `}
                </style>
            </div>
        );
    }
}

MessageList.propTypes = {
    messages: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };