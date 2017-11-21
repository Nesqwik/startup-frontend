// @flow

import React from 'react'
import Enzyme from 'enzyme'
import Menu from "../Menu";
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';

describe('<Menu />', () => {


    function createElement() {
        return Enzyme.shallow(
            <Menu />
        );
    }

    it("Should render without crashing", () => {
        const wrapper = createElement();
        expect(wrapper).not.toBeNull();
    });

    it("Should an app bar but no left menu", () => {
        const wrapper = createElement();
        expect(wrapper.find(AppBar)).not.toBeNull();
        expect(wrapper.find(Drawer)).not.toBeNull();
        expect(wrapper.find(Drawer).props().open).toBe(false);
    });

    it("Sould toggle the left menu if click on app bar hamburger menu", () => {
        const wrapper = createElement();

        wrapper.instance().handleToggle();
        wrapper.update();
        expect(wrapper.find(Drawer).props().open).toBe(true);
        wrapper.instance().handleToggle();
        wrapper.update();
        expect(wrapper.find(Drawer).props().open).toBe(false);
    });
    
});