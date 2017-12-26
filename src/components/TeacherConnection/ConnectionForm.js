// @flow

import React from "react";
import {Field, reduxForm} from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import {alphaNum, minLength2, renderPasswordField, renderTextField, required} from "../../utils/ReduxFormUtils";
import ValidateButton from "../ValidateButton/ValidateButton";

/**
 * Formulaire de connexion d'un enseignant.
 * @param props
 * @returns {XML}
 * @constructor
 */


let ConnectionForm = props => {
    /**
     * handleConnect => fonction de gestion du formulaire (correspond au onSubmit donné lors de l'instanciation)
     * invalid => boolean à faux si le formulaire est invalide. Vrai sinon.
     * onCancel => fonction donné lors de l'instanciation du composant. Appelé lors d'un clique sur le bouton annuler.
     */
    const {valid, onCancel, handleConnect, isLoading} = props;

    return (
        <form onSubmit={handleConnect} className="connect-teacher-form">

            <Field
                name="teacherEmail"
                component={renderTextField}
                label="Email"
                validate={[required, minLength2, alphaNum]}
            /><br/>

            <Field
                name="teacherPassword"
                component={renderPasswordField}
                label="Mot de passe"
                validate={[required, minLength2, alphaNum]}
            />


            <div>
                <ValidateButton
                    isValid={valid}
                    isLoading={isLoading}
                    label={"Se connecter"}
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
    form: 'ConnectionForm'
})(ConnectionForm);