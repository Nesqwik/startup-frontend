// @flow

import React, {Component} from "react";
import CreateClassForm from "./CreateClassForm";
import Dialog from "material-ui/Dialog";
import * as ReducerUtils from "../../reducers/ReducerUtils";
import type {Classroom} from "../../types/Classroom";
import AddButton from "../Common/AddButton";


type Props = {
    postStatus: ReducerUtils.PostStatus,
    onPostClass: (Classroom) => Promise<Classroom>
};

type State = {
    open: boolean,
    serverErrors: Array<string>
}

/**
 * Composant permettant de créer une classe.
 * Constitué d'un bouton + qui ouvre une modal contenant le formulaire.
 *
 * propriétés :
 *  postStatus: état de la requête d'ajout de classe.
 *  onPostClass: fonction callback à appeler pour ajouter une classe.
 */
class CreateClass extends Component<Props, State> {

    /**
     * Attributs du composant.
     * open : boolean vrai si la modal est ouverte, faux sinon.
     * serverErrors: tableau d'erreur à afficher sur le formulaire. (sera modifié ensuite par une notification)
     * @type {{open: boolean, serverErrors: Array}}
     */
    state = {
        open: false,
        serverErrors: []
    };

    /**
     * Ouvre la modal
     */
    handleOpen() {
        this.setState({open: true});
    };

    /**
     * Ferme la modale
     */
    handleClose() {
        this.setState({open: false});
    };


    /**
     * fonction appelé lors de l'envoi du formulaire.
     * @param form Le formulaire (valide)
     */
    onSubmit(form: Object) {
        let classroom: Classroom = {
            className: form.className
        };

        this.props.onPostClass(classroom).then(() => {
            this.handleClose();
        }, (errors) => {
            this.setState({
                serverErrors: errors
            });
        });
    }

    render() {
        return (
            <div className="create-class">
                <AddButton onClick={this.handleOpen.bind(this)}/>
                <Dialog
                    title="Créer une classe"
                    modal={true}
                    open={this.state.open}
                    className="dialog-title"
                >
                    <CreateClassForm
                        onSubmit={this.onSubmit.bind(this)}
                        onCancel={this.handleClose.bind(this)}
                        isLoading={this.props.postStatus.posting}
                    />
                    {this.state.serverErrors.map(error => <p>{error}</p>)}
                </Dialog>
            </div>
        );
    }
}

export default CreateClass;
