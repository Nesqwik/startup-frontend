// @flow

import React, {Component} from "react";
import Dialog from "material-ui/Dialog";
import * as ReducerUtils from "../../reducers/ReducerUtils";
import type {Teacher} from "../../types/Teacher";
import { IconButton, Tab, Tabs} from "material-ui";
import SubscribeForm from "./SubscribeForm";
import ConnectionForm from "./ConnectionForm";
import Person from "material-ui/svg-icons/social/person"




type Props = {
    postStatusSubscription: ReducerUtils.PostStatus,
    //TODO onTeacherConnect: ,
    onTeacherSubscribe: (Teacher) => Promise<Teacher>,

};

type State = {
    open: boolean,
    serverErrors: Array<string>,
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
        serverErrors: [],
        indexSelected: 0
    };


    /**
     * Ouvre la modal
     */
    handleOpen(indexSelected: number) {
        this.setState({
            open: true,
            indexSelected: indexSelected});
    };

    /**
     * Ferme la modale
     */
    handleClose() {
        this.setState({open: false});
    };

    /**
     * fonction appelée lors de la connection d'un enseignant.
     * @param form Le formulaire (valide)
     */
    handleConnect(form: Object) {
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
            }

            this.props.onTeacherSubscribe(teacher).then(() => {
                this.handleClose();
            }, (errors) => {
                this.setState({
                    serverErrors: errors
                });
            });
    }


    render() {

        return (
            <div>
                <IconButton
                    iconStyle={{color: "#FFFFFF"}}
                    onClick={this.handleOpen.bind(this, 0)}
                >
                    <Person/>
                </IconButton>



                <Dialog
                    title="Connexion/Inscription"
                    modal={true}
                    open={this.state.open}
                    className="dialog-title"
                    autoScrollBodyContent={true}
                    style={{top:"-70px"}}

                >
                    <Tabs
                        initialSelectedIndex={this.state.indexSelected}
                        tabItemContainerStyle={{
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        <Tab label="Connexion"
                            style={{color: "#575757"}}
                        >
                            <ConnectionForm
                                onSubmit={this.handleConnect.bind(this)}
                                onCancel={this.handleClose.bind(this)}
                                //isLoading={this.props.postStatus.posting}
                            />

                        </Tab>
                        <Tab label="Inscription"
                             style={{color: "#575757"}}
                        >

                            <SubscribeForm
                                onSubmit={this.handleSubscribe.bind(this)}
                                onCancel={this.handleClose.bind(this)}
                                //isLoading={this.props.postStatusSubscription.posting}
                            />

                        </Tab>
                    </Tabs>


                    {this.state.serverErrors.map(error => <p>{error}</p>)}
                </Dialog>
            </div>
        );
    }
}

export default TeacherConnection;
