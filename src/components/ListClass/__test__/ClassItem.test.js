// @flow

import React from 'react'
import Enzyme from 'enzyme'
import ClassItem from "../ClassItem";

describe('<ClassItem />', () => {

    function createElement() {
        let props = {
            classroom: {
                className: "toto",
                id: 1
            }
        };

        return Enzyme.shallow(
            <ClassItem
                {...props}
            />
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement();
        expect(wrapper).not.toBeNull();
    });
});