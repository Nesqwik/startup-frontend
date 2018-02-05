// @flow

import React, {Component} from "react";
import * as ReducerUtils from "../../reducers/ReducerUtils";
import type {Teacher} from "../../types/Teacher";
import {Tab, Tabs} from "material-ui";
import SubscribeForm from "./SubscribeForm";
import ConnectionForm from "./ConnectionForm";


type Props = {
    postStatusSubscription: ReducerUtils.PostStatus,
    postStatusConnection: ReducerUtils.PostStatus,
    onTeacherConnect: (Teacher) => Promise<Teacher>,
    onTeacherSubscribe: (Teacher) => Promise<Teacher>,
    redirectToApp: () => void
};

type State = {
    open: boolean,
    connexionError: Array<string>,
    subscriptionError: Array<string>,
    indexSelected: number
}

/**
 * Composant permettant de se connecter ou de s'inscrire en tant qu'enseignant
 * Constitué de deux boutons  qui ouvrent une modal contenant le formulaire.
 *
 * propriétés :
 *  postStatusSubscription: état de la requête d'inscription.
 *  onTeacherConnect: fonction callback à appeler pour que l'enseignant se connecte.
 *  onTeacherSubscribe: fonction callback à appeler pour que l'enseigant s'inscrive.
 */
class TeacherConnection extends Component<Props, State> {

    /**
     * Attributs du composant.
     * open : boolean vrai si la modal est ouverte, faux sinon.
     * serverErrors: tableau d'erreur à afficher sur le formulaire. (sera modifié ensuite par une notification)
     * indexSelected: la Tab qui doit être selectionné à l'ouverture du form
     * @type {{open: boolean, serverErrors: Array, indexSelected:number}}
     */
    state = {
        open: false,
        connexionError: [],
        subscriptionError: [],
        indexSelected: 1
    };


    /**
     * Ouvre la modal
     */
    handleOpen(indexSelected: number) {
        this.setState({
            open: true,
            indexSelected: indexSelected
        });
    };

    /**
     * Ferme la modale
     */
    handleClose() {
        this.setState({open: false});
    };

    /**
     * fonction appelée lors de la connexion d'un enseignant.
     * @param form Le formulaire (valide)
     */
    handleConnect(form: Object) {
        let teacher: Teacher = {
            email: form.teacherEmail,
            password: form.teacherPassword
        };

        this.props.onTeacherConnect(teacher).then(() => {
            this.props.redirectToApp();
        }, (errors) => {
            this.setState({
                connexionError: ["La combinaison email/mot de passe est incorrecte."]
            });
        });

    }

    /**
     * fonction appelée lors de l'inscription d'un enseignant.
     * @param form Le formulaire (valide)
     */
    handleSubscribe(form: Object) {
        let teacher: Teacher = {
            name: form.teacherName,
            email: form.teacherEmail,
            password: form.teacherPassword
        };

        this.props.onTeacherSubscribe(teacher).then(() => {
        }, (errors) => {
            this.setState({
                subscriptionError: errors
            });
        });
    }


    render() {

        return (
            <Tabs
                initialSelectedIndex={this.state.indexSelected}
                tabItemContainerStyle={{
                    backgroundColor: "#FFFFFF",
                }}
                style={{
                    paddingTop: "1px",
                }}
            >
                <Tab label="Connexion"
                     style={{color: "#575757"}}
                >
                    <ConnectionForm
                        onSubmit={this.handleConnect.bind(this)}
                        onCancel={this.handleClose.bind(this)}
                    />

                    {this.state.connexionError.map((error) => <span>{error}</span>)}

                </Tab>
                <Tab label="Inscription"
                     style={{color: "#575757"}}
                >

                    <SubscribeForm
                        onSubmit={this.handleSubscribe.bind(this)}
                        onCancel={this.handleClose.bind(this)}
                    />

                </Tab>
            </Tabs>
        );
    }
}

export default TeacherConnection;
