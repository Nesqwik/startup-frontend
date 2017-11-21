// @flow

import React from 'react'
import Enzyme from 'enzyme'
import AddButton from "../AddButton";
import ContentAdd from 'material-ui/svg-icons/content/add';

describe('<AddButton />', () => {

    let onClick;

    function createElement() {
        onClick = jest.fn().mockReturnValue(Promise.resolve());
        let props = {
            onClick: onClick
        };

        return Enzyme.shallow(
            <AddButton
                {...props}
            />
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement();
        expect(wrapper).not.toBeNull();
    });

    it("Should show add button", () => {
        const wrapper = createElement();
        expect(wrapper.find(AddButton)).not.toBeNull();
        expect(wrapper.find(AddButton).find(ContentAdd)).not.toBeNull();
    });

    it("Call the onClick function when click on it", () => {
        const wrapper = createElement();

        wrapper.simulate('click');

        expect(onClick.mock.calls.length).toBe(1);
    });
    
});