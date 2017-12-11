// @flow
import type {Points} from "./Points";

/**
 * type student
 * id (optionnel): identifiant de l'élève.
 * firstName: prénom de l'élève
 * lastName: nom de l'élève
 * born: date de naissance de l'élève
 * idClass: identifiant de la classe de l'élève
 * bonus: nombre de point bonus de l'élève
 * malus: nombre de point malus de l'élève
 */

export type Student = {
    id?: number,
    firstName: string,
    lastName: string,
    born: string,
    classroom: {
        id: number
    },
    points: Points
};