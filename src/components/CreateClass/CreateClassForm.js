// @flow
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import {Field, reduxForm} from "redux-form";
import {renderTextField, required, minLength2, alphaNum} from "../../utils/ReduxFormUtils";
import ValidateButton from "../ValidateButton/ValidateButton";

/**
 * Formulaire de création de classe.
 * @param props
 * @returns {XML}
 * @constructor
 */
let CreateClassForm = props => {
    /**
     * handleSubmit => fonction de gestion du formulaire (correspond au onSubmit donné lors de l'instanciation)
     * invalid => boolean à faux si le formulaire est invalide. Vrai sinon.
     * onCancel => fonction donné lors de l'instanciation du composant. Appelé lors d'un clique sur le bouton annuler.
     */
    const {handleSubmit, valid, onCancel, isLoading} = props;

    return (
        <form onSubmit={handleSubmit} className="create-class-form">
            <Field
                name="className"
                component={renderTextField}
                label="Nom de la classe"
                validate={[required, minLength2, alphaNum]}
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
    form: 'createClass'
})(CreateClassForm);