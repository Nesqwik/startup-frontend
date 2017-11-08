// @flow

import React from 'react'
import Enzyme from 'enzyme'
import CreateClass from "../CreateClass";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from "material-ui/Dialog";
import RaisedButton from "material-ui/RaisedButton";

describe('<CreateClass />', () => {

    let onPostClass;

    function createElement() {
        onPostClass = jest.fn().mockReturnValue(Promise.resolve());
        let props = {
            postStatus: {
                posting: false,
                posted: false,
                postError: null
            },
            onPostClass: onPostClass
        };

        return Enzyme.shallow(
            <CreateClass
                {...props}
            />
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement();
        expect(wrapper).not.toBeNull();
    });

    it("Should show add button without form", () => {
        const wrapper = createElement();
        expect(wrapper.find(FloatingActionButton)).not.toBeNull();
        expect(wrapper.find(FloatingActionButton).find(ContentAdd)).not.toBeNull();

        expect(wrapper.find(Dialog).props().open).toBe(false);
    });


    it("Should open dialog if click button", () => {
        const wrapper = createElement();
        wrapper.find(FloatingActionButton).simulate('click');

        expect(wrapper.find(Dialog).props().open).toBe(true);
    });


    it("Call the submit function", () => {
        const wrapper = createElement();

        wrapper.instance().onSubmit({
            className: "test"
        });

        expect(onPostClass.mock.calls.length).toBe(1);
        expect(onPostClass.mock.calls[0][0]).toEqual({
            className: "test"
        });

    });
    
});