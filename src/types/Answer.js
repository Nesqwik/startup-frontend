// @flow

/**
 * type answer
 * id (optionnel): identifiant de la réponse
 * choice: texte de réponse
 * good: boolean déterminant si c'est une bonne réponse
 */
export type Answer = {
    choice: string,
    good: boolean,
    id?: number
}