// Modules
import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';

// Custom components
import Message from './Message';
import MessageList from './MessageList';

// Tests
describe('<MessageList/>', () => {
  const messages = [
    { id: 0, message: "Je", username: "frederic.mamath@gmail.com", date: Date.now() },
    { id: 1, message: "Tu", username: "frederic.mamath@gmail.com", date: Date.now() },
    { id: 2, message: "Il", username: "frederic.mamath@gmail.com", date: Date.now() },
    { id: 4, message: "Nous", username: "olivier.nguyen@gmail.com", date: Date.now() },
    { id: 5, message: "Vous", username: "mathieu.mamath@gmail.com", date: Date.now() },
    { id: 6, message: "Ils", username: "mickael.avril@gmail.com", date: Date.now() }
  ];
  const developerEmail = 'fredericmamath@gmail.com';
  const wrapper = shallow(
    <MessageList
      messages={messages}
      currentUserEmail={developerEmail}
    />
  );

  it('should render six <Message/>"', () => {
    console.log(wrapper.find(Message).length);
    expect(wrapper.find(Message).length).toBe(6);
  });
});
