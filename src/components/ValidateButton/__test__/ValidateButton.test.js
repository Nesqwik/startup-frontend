// @flow

import React from 'react'
import Enzyme from 'enzyme'
import ValidateButton from "../ValidateButton";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from 'material-ui/CircularProgress';
import DoneIcon from 'material-ui/svg-icons/action/done';
import BlockIcon from 'material-ui/svg-icons/content/block';

describe('<ValidateButton />', () => {

    function createElement(props) {
        return Enzyme.shallow(
            <ValidateButton
                {...props}
            />
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement({
            isValid: true,
            isLoading: false,
            label: "Valider"
        });
        expect(wrapper).not.toBeNull();
    });

    it("Should be disabled and show block icon if not valid", () => {
        const wrapper = createElement({
            isValid: true,
            isLoading: false,
            label: "Valider"
        });

        expect(wrapper.find(RaisedButton).props().disabled).toBe(false);
        expect(wrapper.instance().getIcon()).toEqual(<DoneIcon/>)
    });

    it("Should be disabled and show block icon if not valid", () => {
        const wrapper = createElement({
            isValid: false,
            isLoading: false,
            label: "Valider"
        });

        expect(wrapper.find(RaisedButton).props().disabled).toBe(true);
        expect(wrapper.instance().getIcon()).toEqual(<BlockIcon/>)
    });

    it("Should be disabled and show spinner if loading", () => {
        const wrapper = createElement({
            isValid: true,
            isLoading: true,
            label: "Valider"
        });

        expect(wrapper.find(RaisedButton).props().disabled).toBe(true);
        expect(wrapper.instance().getIcon()).toEqual(<CircularProgress size={25}/>)
    });

    it("Should be disabled if and show spinner if loading and not valid", () => {
        const wrapper = createElement({
            isValid: false,
            isLoading: true,
            label: "Valider"
        });

        expect(wrapper.find(RaisedButton).props().disabled).toBe(true);
        expect(wrapper.instance().getIcon()).toEqual(<CircularProgress size={25}/>)
    });

    it("Should print the same label that given one", () => {
        const wrapper = createElement({
            isValid: false,
            isLoading: true,
            label: "Valider"
        });

        expect(wrapper.find(RaisedButton).props().label).toBe("Valider");
    });

});