// @flow
import RaisedButton from "material-ui/RaisedButton";
import React from "react";
import {Field, FieldArray, reduxForm} from "redux-form";
import {numeric, renderCheckbox, renderNumberField, renderTextField, required} from "../../utils/ReduxFormUtils";
import Plus from "material-ui/svg-icons/content/add"

import ValidateButton from "../ValidateButton/ValidateButton";
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';

import {Card, CardActions, CardText, FlatButton, Table, TableBody, TableRow, TableRowColumn} from "material-ui";


/**
 * Formulaire de création de classe.
 * @param props
 * @returns {XML}
 * @constructor
 */
let CreateQCMForm = props => {
    /**
     * handleSubmit => fonction de gestion du formulaire (correspond au onSubmit donné lors de l'instanciation)
     * invalid => boolean à faux si le formulaire est invalide. Vrai sinon.
     * onCancel => fonction donné lors de l'instanciation du composant. Appelé lors d'un clique sur le bouton annuler.
     */
    const {handleSubmit, valid, onCancel, isLoading} = props;


    const renderAnswers = ({fields}) => {

        return (
            <div>
                <Table
                    bodyStyle={{maxHeight:'200px'}}
                    selectable={false}
                    style={{
                        width: '150%',
                        maxWidth: 'none',}}>
                    <Subheader> Réponses: </Subheader>
                    <TableBody
                        displayRowCheckbox={false}>


                    {
                        fields.map((answer, index) => (
                        <TableRow key={index}>
                            <TableRowColumn>
                            <Field
                                name={`${answer}.choice`}
                                type="text"
                                validate={[required]}
                                component={renderTextField}
                                label={`Réponse #${index + 1}`}/>

                            <Field
                                label={"Réponse correcte"}
                                name={`${answer}.good`}
                                component={renderCheckbox}/>
                            </TableRowColumn>
                            <TableRowColumn>
                                <IconButton onClick={() => fields.remove(index)}>
                                    <Delete
                                       color={'#afafaf'}
                                  />
                                </IconButton>
                            </TableRowColumn>
                        </TableRow>

                    ))

                    }

                    </TableBody>
                </Table>
                <FlatButton
                    label="Ajouter une réponse supplémentaire"
                    labelPosition="after"
                    icon={<Plus/> }
                    onClick={() => fields.push({good: false})}
                    style={{color:'#afafaf'}}
                    labelStyle={{textTransform : "none",
                        fontWeight: "normal"}}

                />
            </div>

        );
    };

    const renderQuestions = ({fields}) => {
        return (
            <div>

                <Subheader> Questions: </Subheader>

                {
                    fields.map((question, index) => (
                        <Card key={index}>
                            <CardText>
                                <Field
                                    name={`${question}.query`}
                                    type="text"
                                    validate={[required]}
                                    component={renderTextField}
                                    label={`Question #${index + 1}`}
                                />

                                <Field
                                    name={`${question}.nbPoints`}
                                    type="text"
                                    validate={[required, numeric]}
                                    component={renderNumberField}
                                    label={`Nombre de points`}
                                />
                                <FieldArray name={`${question}.choices`} component={renderAnswers}/>
                            </CardText>

                            <CardActions>

                                <IconButton onClick={() => fields.remove(index)}>
                                    <Delete
                                        color={'#afafaf'}
                                    />
                                </IconButton>

                            </CardActions>
                        </Card>


                    ))
                }
                <FlatButton
                    label="Ajouter une question"
                    labelPosition="after"
                    icon={<Plus/> }
                    onClick={() => fields.push()}
                    style={{color:'#afafaf'}}
                    labelStyle={{textTransform : "none",
                        fontWeight: "normal"}}
                />

            </div>

        );
    };


    return (
        <form onSubmit={handleSubmit} className="create-qcm-form">
            <Field
                name="title"
                component={renderTextField}
                label="Titre du QCM"
                validate={[required]}
            /><br/>

            <Field
                name="instructions"
                component={renderTextField}
                label="Instructions du QCM"
            />


            <FieldArray name="questions" component={renderQuestions}/>

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
    form: 'createQuestion'
})(CreateQCMForm);