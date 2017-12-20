// @flow

import React from 'react'
import Enzyme from 'enzyme'
import Dialog from "material-ui/Dialog";
import AddButton from "../../Common/AddButton";
import CreateQCM from "../CreateQCM";

describe('<CreateQCM />', () => {

    let onPostQCM;

    function createElement() {
        onPostQCM = jest.fn().mockReturnValue(Promise.resolve());
        let props = {
            postStatus: {
                posting: false,
                posted: false,
                postError: null
            },
            onPostQCM: onPostQCM,
            classId: 1,
        };

        return Enzyme.shallow(
            <CreateQCM
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
        expect(wrapper.find(AddButton)).not.toBeNull();

        expect(wrapper.find(Dialog).props().open).toBe(false);
    });


    it("Should open dialog if click button", () => {
        const wrapper = createElement();
        wrapper.find(AddButton).simulate('click');

        expect(wrapper.find(Dialog).props().open).toBe(true);
    });


    it("Call the submit function", () => {
        const wrapper = createElement();

        wrapper.instance().onSubmit({
            idClass: 1,
            instruction: undefined,
            questions: [],
            title: "title",
        });

        expect(onPostQCM.mock.calls.length).toBe(1);
        expect(onPostQCM.mock.calls[0][0]).toEqual({
            idClass: 1,
            instruction: undefined,
            questions: [],
            title: "title",        });

    });

});