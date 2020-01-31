import React from 'react';
import { shallow } from 'enzyme';       
import LoginPage from '../src/Component/LoginPage'

const wrapper = shallow(<LoginPage />)

describe('LoginPage', () =>{
    it('SignUpPage1 Page renders correctly', ()=>{
        expect(shallow(<LoginPage/>)).toMatchSnapshot()
    })

    it('check initial state', ()=>{
        expect(wrapper.state("email")).toEqual('');
        expect(wrapper.state("password")).toEqual('');
    })

    const emailInput = wrapper.find('TextInput').first();
    const passwordInput = wrapper.find('TextInput').last();

    it("validate email & password", ()=>{
        emailInput.props().onChangeText('manojmansukh7@gmail.com')
        passwordInput.props().onChangeText('123456')

        expect(wrapper.state("email")).toEqual('manojmansukh7@gmial.com')
        expect(wrapper.state("password")).toEqual('123456')


    })

    // it("testing email validation", ()=>{
    //     const instance= wrapper.instance();
    //     expect(instance.validateEmail()).toBe(true);

    //     emailInput.props().onChangeText('manojmansukh7@gmail.com');
    //     expect(instance.validateEmail()).toBe(true);

    //     emailInput.props().onChangeText('manojmansukh7gmail.com');
    //     expect(instance.validateEmail()).toBe(false);
    // })
})