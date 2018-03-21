import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from '../../src/components/LoginPage';

let startLoginWithGoogle;
let startLoginWithGithub;

beforeEach(() => {
    startLoginWithGoogle = jest.fn();
    startLoginWithGithub = jest.fn();
});

test('should render login page correctly', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {}}/>);
    expect(wrapper).toMatchSnapshot();
});

test('should call startLoginWithGoogle on google button click', () => {
    const wrapper = shallow(<LoginPage startLoginWithGoogle={startLoginWithGoogle} />);

    wrapper.find('button').at(0).simulate('click');

    expect(startLoginWithGoogle).toHaveBeenCalled();
});

test('should call startLoginWithGithub on github button click', () => {
    const wrapper = shallow(<LoginPage startLoginWithGithub={startLoginWithGithub} />);

    wrapper.find('button').at(1).simulate('click');

    expect(startLoginWithGithub).toHaveBeenCalled();
});
