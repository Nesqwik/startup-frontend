// @flow
import React, {Component} from 'react'
import CreateQCMForm from "./CreateQCMForm";
import Dialog from "material-ui/Dialog";
import * as ReducerUtils from "../../reducers/ReducerUtils";
import type {QCM} from "../../types/QCM";
import AddButton from "../Common/AddButton";

type Props = {
    onPostQCM: (QCM) => Promise<QCM>,
    postStatus: ReducerUtils.PostStatus,
    classId: number
}

type State = {
    open: boolean,
    serverErrors: Array<string>
}

/**
 * Composant permettant de créer un QCM
 *
 * propriétés :
 *  onPostQCM: fonction callback à appeler pour créer un nouveau QCM
 *  postStatus: état de la requête d'ajout de QCM
 *  classId: ID de la classe
 */
class CreateQCM extends Component<Props, State> {

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
        let qcm: QCM = {
            idClass: this.props.classId,
            instruction: form.instructions,
            questions: form.questions,
            title: form.title
        };

        this.props.onPostQCM(qcm).then(() => {
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
                <AddButton label="Envoyer un qcm" onClick={this.handleOpen.bind(this)} />
                <Dialog
                    title="Créer un QCM"
                    modal={true}
                    open={this.state.open}
                    className="dialog-title"
                    autoScrollBodyContent={true}
                    style={{top:"-100px"}}>
                    <CreateQCMForm
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

export default CreateQCM;
