// Modules
import React from 'react';
import {render} from 'enzyme';
import expect from 'expect';

// Custom components
import Message from './Message';

// Tests
describe('<Message/>', () => {
  const currentUserEmail = 'fredericmamath@gmail.com';
  const developer = 'fredericmamath@gmail.com';
  const message = 'Hello world !';
  const wrapper = render(
    <Message
      currentUserEmail={currentUserEmail}
      text={message}
      from={developer}
      date={Date.now()}
    />
  );

  it('should contain the text "Hello world"', () => {
    expect(wrapper.find('#text')[0].children[0].data).toBe(message);
  });
  it('should be to the right since it\'s from the developer', () => {
    expect(wrapper.find('li')[0].attribs.style).toBe('text-align:right;');
  });
});
