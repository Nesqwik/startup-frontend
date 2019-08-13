// @flow

import React from 'react'
import Enzyme from 'enzyme'
import ListQCM from "../ListQCM";
import QCMItem from "../QCMItem";

describe('<ListQCM />', () => {

    let onFetchQCM;

    function createElement() {
        onFetchQCM = jest.fn().mockReturnValue(Promise.resolve());
        let props = {
            qcmList: [{
                classroom: {
                    id: 1
                },
                instruction: "",
                questions: [],
                title: ""

            }, {

                classroom: {
                    id: 2
                },
                instruction: "",
                questions: [],
                title: ""

            }, {
                    classroom: {
                        id: 3
                    },
                    instruction: "",
                    questions: [],
                    title: ""

            }],
            fetchQCMs: onFetchQCM,
            fetchStatus: {
                fetching: false,
                fetched: false,
                fetchError: null
            }
        };

        return Enzyme.shallow(
            <ListQCM
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

        expect(onFetchQCM.mock.calls.length).toBe(1);
    });

    it("Should print all the given classes", () => {
        const wrapper = createElement();

        expect(wrapper.find(QCMItem).length).toBe(3);
        expect(wrapper.find(QCMItem).get(0).props.qcm).toEqual({
            classroom: {
                id: 1
            },
            instruction: "",
            questions: [],
            title: ""

        });
        expect(wrapper.find(QCMItem).get(1).props.qcm).toEqual({
            classroom: {
                id: 2
            },
            instruction: "",
            questions: [],
            title: ""

        });
        expect(wrapper.find(QCMItem).get(2).props.qcm).toEqual({
            classroom: {
                id: 3
            },
            instruction: "",
            questions: [],
            title: ""

        });
    });

});