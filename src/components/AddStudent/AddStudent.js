// @flow

import React, {Component} from "react";
import Dialog from "material-ui/Dialog";
import * as ReducerUtils from "../../reducers/ReducerUtils";
import type {Classroom} from "../../types/Classroom";
import type {Student} from "../../types/Student";
import AddStudentForm from "./AddStudentForm";
import AddButton from "../Common/AddButton";
import moment from "moment";


type Props = {
    postStatus: ReducerUtils.PostStatus,
    onAddStudent: (Student) => Promise<Student>,
    classroom : Classroom

};

type State = {
    open: boolean,
    serverErrors: Array<string>,
    searchValue: string,
    dateBirthday: string,
    validDate: boolean
}

/**
 * Composant permettant de créer et d'ajouter un élève à une classe.
 * Constitué d'un bouton + qui ouvre une modal contenant le formulaire.
 *
 * propriétés :
 *  postStatus: état de la requête d'ajout d'élève.
 *  onAddStudent: fonction callback à appeler pour ajouter un élève.
 *  classroom: classe pour laquelle l'élève est ajouté
 */
class AddStudent extends Component<Props, State> {

    /**
     * Attributs du composant.
     * open : boolean vrai si la modal est ouverte, faux sinon.
     * serverErrors: tableau d'erreur à afficher sur le formulaire. (sera modifié ensuite par une notification)
     * searchValue: chaine de caractères contenant la valeur du champs de recherche
     * @type {{open: boolean, serverErrors: Array, searchValue: string, dateBirthday: string, validDate: boolean}}
     */
    state = {
        open: false,
        serverErrors: [],
        searchValue: "",
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
     * fonction appelée lors de l'envoi du formulaire.
     * @param form Le formulaire (valide)
     */
    handleSubmit(form: Object) {
        let student: Student = {
            firstName: form.studentFirstName,
            lastName: form.studentLastName,
            born: moment(form.born).toISOString(),
            idClass: this.props.classroom.id

        };

        this.props.onAddStudent(student).then(() => {
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
                <AddButton onClick={this.handleOpen.bind(this)}/>
                <Dialog
                    title="Ajouter un élève"
                    modal={true}
                    open={this.state.open}
                    className="dialog-title"
                >
                    <AddStudentForm
                        onSubmit={this.handleSubmit.bind(this)}
                        onCancel={this.handleClose.bind(this)}
                        isLoading={this.props.postStatus.posting}
                    />

                    {this.state.serverErrors.map(error => <p>{error}</p>)}
                </Dialog>
            </div>
        );
    }
}

export default AddStudent;
