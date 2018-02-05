// @flow

import React from "react";
import {Field, reduxForm} from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import {email, renderPasswordField, renderTextField, required} from "../../utils/ReduxFormUtils";
import ValidateButton from "../ValidateButton/ValidateButton";

/**
 * Formulaire de connexion d'un enseignant.
 * @param props
 * @returns {XML}
 * @constructor
 */


let ConnectionForm = props => {
    /**
     * onSubmit => fonction de gestion du formulaire (correspond au onSubmit donné lors de l'instanciation)
     * invalid => boolean à faux si le formulaire est invalide. Vrai sinon.
     * onCancel => fonction donné lors de l'instanciation du composant. Appelé lors d'un clique sur le bouton annuler.
     */
    const {valid, onCancel, handleSubmit, isLoading} = props;

    return (
        <form onSubmit={handleSubmit} className="connect-teacher-form">
            <Field
                name="teacherEmail"
                component={renderTextField}
                label="Email"
                validate={[required, email]}
            /><br/>

            <Field
                name="teacherPassword"
                component={renderPasswordField}
                label="Mot de passe"
                validate={[required]}
            />


            <div>
                <ValidateButton
                    isValid={valid}
                    isLoading={isLoading}
                    label={"Se connecter"}
                />

            </div>
        </form>
    );
};


export default reduxForm({
    form: 'ConnectionForm'
})(ConnectionForm);