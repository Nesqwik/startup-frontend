// @flow

import React from 'react'
import Enzyme from 'enzyme'
import ListClass from "../ListClass";
import ClassItem from "../ClassItem";

describe('<ListClass />', () => {

    let onFetchClasses;

    function createElement() {
        onFetchClasses = jest.fn().mockReturnValue(Promise.resolve());
        let props = {
            classes: [{
                className: "toto",
                id: 1
            }, {
                className: "tata",
                id: 2
            }, {
                className: "titi",
                id: 3
            }],
            fetchClasses: onFetchClasses,
            fetchStatus: {
                fetching: false,
                fetched: false,
                fetchError: null
            }
        };

        return Enzyme.shallow(
            <ListClass
                {...props}
            />
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement();
        expect(wrapper).not.toBeNull();
    });

    it("Should call the fetchClasses function at the construction", () => {
        const wrapper = createElement();

        expect(onFetchClasses.mock.calls.length).toBe(1);
    });

    it("Should print all the given classes", () => {
        const wrapper = createElement();

        expect(wrapper.find(ClassItem).length).toBe(3);
        expect(wrapper.find(ClassItem).get(0).props.classroom).toEqual({className: "toto", id: 1});
        expect(wrapper.find(ClassItem).get(1).props.classroom).toEqual({className: "tata", id: 2});
        expect(wrapper.find(ClassItem).get(2).props.classroom).toEqual({className: "titi", id: 3});
    });
    
});