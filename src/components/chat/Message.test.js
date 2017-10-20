// Modules
import React from 'react';
import {render} from 'enzyme';
import expect from 'expect';

// Custom components
import Message from './Message';

// Tests
describe('Testing Message component', () => {
  it('should contain the text "Hello world"', () => {
    const developer = 'fredericmamath@gmail.com';
    const wrapper = render(
      <Message
        currentUserEmail="fredericmamath@gmail.com"
        text="Hello world"
        from={developer}
        date={Date.now()}
      />
    );

    expect(wrapper.find('#text')[0].children[0].data).toBe('Hello world');
  });
});
