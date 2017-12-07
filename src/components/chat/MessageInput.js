/* eslint react/jsx-no-bind: 0 */
import React from 'react';
import { createForm } from 'rc-form';

const MessageInput = ({ onNewMessage, form }) => (
    <div className="inputContainer container-fluid">

        <form 
            onSubmit={e => {
                e.preventDefault();
                form.validateFields((err, values) => {
                    if(!err) {
                        onNewMessage(values.message);
                        form.setFieldsValue({
                            message: ''
                        });
                    }
                });
            }}
        >
            <div className="row middle-xs center-xs">
                <div className="col-xs-10">
                    {form.getFieldDecorator('message', {
                        rules: [{ required: true }]
                    })(
                        <input 
                            placeholder="Type here !"
                        />
                    )}
                </div>
                <div className="col-xs-2 end-xs">
                    <button>SEND</button>
                </div>
            </div>
        </form>

        <style jsx>
            {`
                .inputContainer {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 40px;
                    background-color: white;
                    border-top: 2px solid #e3e3e3;
                }

                input {
                    width: 100%;
                    border: none;
                    background-color: white;
                    height: 40px;
                    outline: none;
                }

                input::placeholder {
                    font-weight: 500;
                }

                button {
                    border: none;
                    background-color: white;
                    color: #0084ff;
                }
            `}
        </style>
    </div>
);

MessageInput.propTypes = {
    onNewMessage: React.PropTypes.func.isRequired,
    form: React.PropTypes.object.isRequired
  };
  

export default createForm()(MessageInput);