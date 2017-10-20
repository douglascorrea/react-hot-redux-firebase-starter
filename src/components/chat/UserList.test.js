// Modules
import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';

// Custom components
import User from './User';
import UserList from './UserList';

// Tests
describe('<UserList/>', () => {
  const users = [
    { id: 0, name: "avril@gmail.com" },
    { id: 1, name: "mamath@gmail.com" },
    { id: 2, name: "mathieu@gmail.com" },
    { id: 3, name: "frederic@gmail.com" },
    { id: 4, name: "mickael@gmail.com" }
  ];
  const wrapper = shallow(
    <UserList
      users={users}
    />
  );

  it('should render five <User/>"', () => {
    expect(wrapper.find(User).length).toBe(5);
  });
});
