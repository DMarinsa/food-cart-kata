import React from 'react';
import { shallow } from 'enzyme';
import Button from '.';

describe('Button', () => {
    it('Renders without errors', () => {
        const clickHandler = jest.fn();
        shallow(
            <Button onClick={clickHandler}>Click me</Button>
        );
    });

    it('Renders a disabled button if passed disabled', () => {
        const clickHandler = jest.fn();
        const wrapper = shallow(
            <Button onClick={clickHandler}>Click me</Button>
        );
        expect(
            wrapper.find('button').prop('disabled')
        ).toBe(false);
    });

    it('Calls onClick handler when clicked', () => {
        const clickHandler = jest.fn();
        const wrapper = shallow(
            <Button onClick={clickHandler}>Click me</Button>
        );
        wrapper.find('button').simulate('click');
        expect(clickHandler).toHaveBeenCalled();
    });
});
