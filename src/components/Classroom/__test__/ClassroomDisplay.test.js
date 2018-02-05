// @flow

import React from 'react'
import Enzyme from 'enzyme'
import ClassroomDisplay from "../ClassroomDisplay";
import * as ReducerUtils from "../../../reducers/ReducerUtils";
import {TableRow} from "material-ui";

describe('<ClassroomDisplay />', () => {

    let onFetchStudents, onFetchClasses;

    function createElement() {
        onFetchStudents = jest.fn().mockReturnValue(Promise.resolve());
        onFetchClasses = jest.fn().mockReturnValue(Promise.resolve());
        let props = {
            students: [{
                id : 1,
                firstName : "Jean",
                lastName: "Bon",
                born: "2017-11-28T13:48:43.089Z",
                classroom: {
                    id: 1
                },
                points: {
                    bonus : 20,
                    malus : 1,
                    idStudent: 1
                },
                uuid: "abcdef123456",
            }, {
                id : 2,
                firstName : "Jeanne",
                lastName: "Bonne",
                born: "2016-11-28T13:48:43.089Z",
                classroom: {
                    id: 1
                },
                points: {
                    bonus : 20,
                    malus : 1,
                    idStudent: 2
                },
                uuid: "ghijklm123456",
            }],
            classroom:{
                id : 1,
                className: "CP"
            },
            fetchStudents: onFetchStudents,
            fetchClasses: onFetchClasses,
            fetchStatusClass: ReducerUtils.createFetchStatus(),
            fetchStatusStudent: ReducerUtils.createFetchStatus(),
            postStatus: ReducerUtils.createPostStatus(),
            onAddStudent: jest.fn().mockReturnValue(Promise.resolve()),
            onAddBonus: jest.fn().mockReturnValue(Promise.resolve()),
            onAddMalus: jest.fn().mockReturnValue(Promise.resolve())

        };

        return Enzyme.shallow(
            <ClassroomDisplay
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

        expect(wrapper.find(TableRow).length).toBe(2);
        expect(wrapper.find(TableRow).first().key()).toEqual("1");
        expect(wrapper.find(TableRow).last().key()).toEqual("2");
    });

});