/**
 * Created by louis on 31/10/17.
 */
// @flow
import React from "react";
import * as FormUtils from "./FormUtils";
import TextField from "material-ui/TextField";
import Checkbox from 'material-ui/Checkbox'

/************************/
/*    INPUT RENDERERS   */
/************************/

/**
 * Return material-ui text field.
 * Used in redux-form <Field> in component attribute.
 * Example :
 * import {renderTextField, required} from "./ReduxFormUtils";
 <Field
    name="name"
    component={renderTextField}
    label="Nom de la classe"
    validate={[required]}
 />

 * @param None, auto generated by redux-form
 */
export const renderTextField = ({input, label, meta: {touched, error}, custom}: Object) => (
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);

export const renderNumberField = ({input, label, meta: {touched, error}, custom}: Object) => (
    <TextField
        type="number"
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
    />
);


export const renderCheckbox = ({ input, label }: Object) => (
    <Checkbox
        label={label}
        checked={!!input.value}
        onCheck={input.onChange}
    />
);

export const renderCustomCheckbox = ({ input}: Object) => (
    <input
        type="checkbox"
        checked={!!input.value}
        onChange={input.onChange}
    />
);

/*********************/
/* FIELD VERIFICATOR */
/*********************/

/**
 * constructor for max length tester
 * Exemple :
 * let maxLength6 = maxLength(6);
 * maxLength6("6 char") // => undefined;
 * maxLength6("plus que 6 char") // => "Ce champ doit faire au plus 6 caractères."
 * @param max length to test
 * @return a function to call with value to test.
 */
export const maxLength = (max: number) => (value: any) => {
    return value && value.length > max ? `Ce champ doit faire au plus ${max} caractères.` : undefined;
};

/**
 * Return error message if the input is more than 30 char.
 */
export const maxLength30 = maxLength(30);

/**
 * constructor for min length tester
 * Exemple :
 * let minLength2 = maxLength(2);
 * maxLength2("1") // => "Ce champ doit faire au moins 6 caractères."
 * maxLength2("plus que 2 char") // => undefined;
 * @param min length to test
 * @return a function to call with value to test.
 */
export const minLength = (min: number) => (value: any) => {
    return value && value.length < min ? `Ce champ doit faire au moins ${min} caractères.` : undefined;
};

/**
 * Return error message if the input is less than 2 char.
 */
export const minLength2 = minLength(2);

/**
 * return error message if the input is not alphanumeric
 * @param value to test
 * @returns undefined if there is no error, the error string else.
 */
export const alphaNum = (value: any) => {
    return value && !FormUtils.isAlphaNum(value) ? "Ce champ ne doit contenir que des caractères alphanumériques, espaces, - et _." : undefined;
};

/**
 * return error message if the input is not numeric
 * @param value to test
 * @returns undefined if there is no error, the error string else.
 */
export const numeric = (value: any) => {
    return value && !FormUtils.isNumeric(value) ? "Ce champ doit être composé de chiffres." : undefined;
};

/**
 * return error message if the input is not alpha
 * @param value to test
 * @returns undefined if there is no error, the error string else.
 */
export const alpha = (value: any) => {
    return value && !FormUtils.isAlpha(value) ? "Ce champ doit être composé de lettres et espaces." : undefined;
};

/**
 * return error message if the input is empty
 * @param value to test
 * @returns undefined if there is no error, the error string else.
 */
export const required = (value: any) => {
    return FormUtils.isEmpty(value) ? "Ce champ est obligatoire." : undefined;
};

/**
 * constructor for regex tester
 * Exemple :
 * let isValue42 = matchRegex(/^42$/, "Le message doit être égale à 42");
 * isValue42("1") // => "Le message doit être égale à 42"
 * isValue42("42") // => undefined;
 * @param regex the regex to test
 * @param error the error to return if the regex not match
 * @return a function to call with value to test as param.
 */
export const matchRegex = (regex: any, error: string) => (value: any) => {
    return !FormUtils.matchRegex(regex, value) ? error : undefined;
};