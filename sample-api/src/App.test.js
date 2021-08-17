import React from 'react'
import { shallow } from 'enzyme';
import App from './App';

let wrapped = shallow(<App/>);
describe('App component home page', () => {

  it('should render the App Component correctly', () => {   
    expect(wrapped).toMatchSnapshot();
  });

  it('Navbar to contain title', () => { 
    expect(wrapped.find('Link').at(0).text()).toEqual("Home");
  });
});