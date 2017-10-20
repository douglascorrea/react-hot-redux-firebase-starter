// Modules
import React from 'react';
import {render} from 'enzyme';
import expect from 'expect';

// Custom components
import User from './User';

// Tests
describe('Testing User component', () => {
  const developer = 'fredericmamath@gmail.com';
  const wrapper = render(
    <User
      name={developer}
    />
  );

  it('should contain the text "Hello world"', () => {
    expect(wrapper.find('#name')[0].children[0].data).toBe('fredericmamath@gmail.com');
  });
});
