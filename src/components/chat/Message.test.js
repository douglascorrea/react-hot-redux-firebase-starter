// Modules
import React from 'react';
import {render} from 'enzyme';
import {expect} from 'expect';

// Custom components
import Message from './Message';

// Tests
describe('Message', () => {
  it('Should render text', () => {
    const wrapper = render(<Message message="Hello world" from="Developer" />);

    expect(wrapper).to.have.text('Hello world');
  });
});
