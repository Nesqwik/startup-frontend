// @flow

/**
 * type teacher
 * id (optionnel): identifiant de l'enseignant.
 * name (optionnel): nom de l'enseignant
 * email: email de l'enseignant
 * password (optionnel): mot de passe de l'enseignant
 */

export type Teacher = {
    email: string,
    id?: number,
    name: string,
    password: string,
    uuid?: string
};