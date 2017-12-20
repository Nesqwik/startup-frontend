// @flow
import React from "react";
import {Field, reduxForm} from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import {alphaNum, minLength2, renderDatePicker, renderTextField, required} from "../../utils/ReduxFormUtils";
import ValidateButton from "../ValidateButton/ValidateButton";

/**
 * Formulaire d'ajout d'élève.
 * @param props
 * @returns {XML}
 * @constructor
 */



let AddStudentForm = props => {
    /**
     * handleSubmit => fonction de gestion du formulaire (correspond au onSubmit donné lors de l'instanciation)
     * invalid => boolean à faux si le formulaire est invalide. Vrai sinon.
     * onCancel => fonction donné lors de l'instanciation du composant. Appelé lors d'un clique sur le bouton annuler.
     */
    const {valid, onCancel, handleSubmit, isLoading} = props;

    return (
        <form onSubmit={handleSubmit} className="add-student-form">

            <Field
                name="studentFirstName"
                component={renderTextField}
                label="Prénom"
                validate={[required, minLength2, alphaNum]}
            />

            <Field
                name="studentLastName"
                component={renderTextField}
                label="Nom"
                validate={[required, minLength2, alphaNum]}
            />


            <Field
                name={"born"}
                label={"Date de naissance"}
                component={renderDatePicker}
                validate={[required]}
            />


            <div>
                <ValidateButton
                    isValid={valid}
                    isLoading={isLoading}
                    label={"Créer"}
                />

                <RaisedButton
                    label="Annuler"
                    onClick={onCancel}
                    className="cancel-button"
                />
            </div>
        </form>
    );
};

export default reduxForm({
    form: 'AddStudent'
})(AddStudentForm);