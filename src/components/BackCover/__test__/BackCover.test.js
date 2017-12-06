// @flow

import React from 'react'
import Enzyme from 'enzyme'
import BackCover from "../BackCover";

describe('<BackCover />', () => {

    function createElement() {
        return Enzyme.shallow(
            <BackCover/>
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement();
        expect(wrapper).not.toBeNull();
    });
});