// @flow

import React from 'react'
import Enzyme from 'enzyme'
import Dialog from "material-ui/Dialog";
import {IconButton} from "material-ui";
import TeacherConnection from "../TeacherConnection";

describe('<TeacherConnection />', () => {

    let onTeacherSubscribe;

    function createElement() {
        onTeacherSubscribe = jest.fn().mockReturnValue(Promise.resolve());
        let props = {
            postStatusSubscription: {
                posting: false,
                posted: false,
                postError: null
            },
            onTeacherSubscribe: onTeacherSubscribe,
        };

        return Enzyme.shallow(
            <TeacherConnection
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
        expect(wrapper.find(IconButton)).not.toBeNull();

        expect(wrapper.find(Dialog).props().open).toBe(false);
    });


    it("Should open dialog if click button", () => {
        const wrapper = createElement();
        wrapper.find(IconButton).simulate('click');

        expect(wrapper.find(Dialog).props().open).toBe(true);
    });


    it("Call the submit function", () => {
        const wrapper = createElement();

        wrapper.instance().handleSubscribe({
            teacherEmail: "jean@wahou.br",
            teacherName: "Bon",
            teacherPassword: "12345678",
        });

        expect(onTeacherSubscribe.mock.calls.length).toBe(1);
        expect(onTeacherSubscribe.mock.calls[0][0].name).toEqual("Bon");
        expect(onTeacherSubscribe.mock.calls[0][0].email).toEqual("jean@wahou.br");
        expect(onTeacherSubscribe.mock.calls[0][0].password).toEqual("12345678");
    });

});