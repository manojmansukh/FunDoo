import React from 'react';
import { shallow } from 'enzyme';
import RegistrationPage from '../src/Component/RegistrationPage'

const wrapper = shallow(<RegistrationPage />)

describe('RegistrationPage', () => {

    it('SignUpPage1 Page renders correctly', () => {
        expect(shallow(<RegistrationPage />)).toMatchSnapshot()
    })

    it('checking initial state', () => {
        expect(wrapper.state('firstName')).toEqual('');
        expect(wrapper.state('lastName')).toEqual('');
    })
    const firstName = wrapper.find('TextInput').first();
    const lastName = wrapper.findWhere((node) => node.prop('testID') === 'lastName')

    it('testing state of component after onChangeText event occur', () => {

        firstName.props().onChangeText('Manoj');

        lastName.props().onChangeText('Mansukh');

        expect(wrapper.state('firstName')).toEqual('Manoj');
        expect(wrapper.state('lastName')).toEqual('Mansukh');
    })

    it('testing validateForm mathod for email validation', () => {

        const instance = wrapper.instance()
        expect(instance.validateForm()).toBe(true)

        emailInput.props().onChangeText('andygmail.com');
        expect(instance.validateEmail()).toBe(false)

        // emailInput.props().onChangeText('andy@gmail.com');
        // expect(instance.validateForm()).toBe(true)

    })

})