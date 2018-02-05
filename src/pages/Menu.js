// @flow
import React, {Component} from 'react'
import {Link} from 'react-router'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

type Props = {
    children: Array<any>
};

type State = {
    openMenu: boolean
};

/**
 * Menu (Appbar et menu à gauche)
 */
class Menu extends Component<Props, State> {

    /**
     * Etat du menu.
     * openMenu : Vrai ou faux si le menu à gauche est ouvert ou non.
     * @type {{openMenu: boolean}}
     */
    state = {
        openMenu: false
    };

    /**
     * Affiche/cache le menu à gauche.
     */
    handleToggle() {
        let isOpen: boolean = !this.state.openMenu;

        this.setState({openMenu: isOpen});
    }

    render() {
        const contentStyle = {
            transition: 'margin-left 450ms cubic-bezier(0.23, 1, 0.32, 1)',
            marginLeft: 0
        };

        /**
         * Permet d'ajouter une marge au contenu de la page pour "pousser" le contenu hors du menu de gauche.
         */
        if (this.state.openMenu) {
            contentStyle.marginLeft = 256;
        }

        return (
            <div>
                <AppBar
                    title={<Link to={"/app"} ><span className="appBarTitle">LudiClasse</span></Link>}
                    onLeftIconButtonTouchTap={this.handleToggle.bind(this)}
                    style={{position: 'fixed'}}
                />
                <Drawer open={this.state.openMenu} containerStyle={{
                    marginTop: 64,
                    height: (window.innerHeight - 64),
                    backgroundColor:"#282828",
                }}
                >
                    <Link to="/app/classes">
                        <MenuItem
                            style={{color:"#FFFFFF"}}
                        >Classe</MenuItem>
                    </Link>
                </Drawer>

                <div style={contentStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Menu;
