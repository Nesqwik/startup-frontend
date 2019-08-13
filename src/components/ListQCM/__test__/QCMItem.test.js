// @flow

import React from 'react'
import Enzyme from 'enzyme'
import QCMItem from "../QCMItem";

describe('<QCMItem />', () => {

    function createElement() {
        let props = {
            qcm: {
                classroom: {
                    id: 1
                },
                instruction: "",
                questions: [],
                title: ""
            }
        };

        return Enzyme.shallow(
            <QCMItem
                {...props}
            />
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement();
        expect(wrapper).not.toBeNull();
    });
});