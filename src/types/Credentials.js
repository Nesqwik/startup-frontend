// @flow

/**
 * type teacher
 * id (optionnel): identifiant de l'enseignant.
 * name (optionnel): nom de l'enseignant
 * email: email de l'enseignant
 * password (optionnel): mot de passe de l'enseignant
 */

export type Credentials = {
    email: string,
    password: string
};