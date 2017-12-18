// @flow
import type {Answer} from "./Answer"

/**
 * type question
 * id (optionnel): identifiant de la question.
 * answers: liste de réponse à la question du qcm
 * nbPoints: nombre de points gagnés par la question
 * query: libellé de la question
 */
export type Question = {
    answers: Array<Answer>,
    id?: number,
    nbPoints: number,
    query: string
}