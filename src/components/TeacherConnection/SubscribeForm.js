// @flow

import React from "react";
import {Field, reduxForm} from "redux-form";
import RaisedButton from "material-ui/RaisedButton";
import {
    alpha, email, minLength2, passwordAlphaNum, minLength8, renderPasswordField, renderTextField,
    required, maxLength20, maxLength30, equal
} from "../../utils/ReduxFormUtils";
import ValidateButton from "../ValidateButton/ValidateButton";

/**
 * Formulaire d'inscription d'un enseignant.
 * @param props
 * @returns {XML}
 * @constructor
 */


let SubscribeForm = props => {
    /**
     * handleSubscribe => fonction de gestion du formulaire (correspond au onSubmit donné lors de l'instanciation)
     * invalid => boolean à faux si le formulaire est invalide. Vrai sinon.
     * onCancel => fonction donné lors de l'instanciation du composant. Appelé lors d'un clique sur le bouton annuler.
     */
    const {valid, onCancel, handleSubmit, isLoading} = props;

    return (
        <form onSubmit={handleSubmit} className="subscribe-teacher-form">

            <Field
                name="teacherEmail"
                component={renderTextField}
                label="Email"
                validate={[required, email ]}
            /><br/>
            <Field
                name="teacherEmailConfirmation"
                component={renderTextField}
                label="Confirmation Email"
                validate={[required, equal.bind(this, "teacherEmail")]}
            /><br/>

            <Field
                name="teacherName"
                component={renderTextField}
                label="Nom"
                validate={[required, minLength2, alpha, maxLength20]}
            /><br/>


            <Field
                name="teacherPassword"
                component={renderPasswordField}
                label="Mot de Passe"
                validate={[required,minLength8, passwordAlphaNum, maxLength30 ]}
            /><br/>
            <Field
                name="teacherPasswordConfirmation"
                component={renderPasswordField}
                label="Confirmation de Mot de Passe"
                validate={[required, equal.bind(this, "teacherPassword")]}

            />


            <div>
                <ValidateButton
                    isValid={valid}
                    isLoading={isLoading}
                    label={"S'inscrire"}
                />

            </div>
        </form>
    );
};

export default reduxForm({
    form: 'SubscribeForm'
})(SubscribeForm);
