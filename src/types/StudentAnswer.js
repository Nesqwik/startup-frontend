// @flow

/**
 * type studentAnswers
 * studentIds: tableau des identifiants des élèves ayant répondu cette réponse
 * answerId: id de la réponse
 */

export type StudentAnswers = {
    studentIds: Array<number>,
    answerId: number
}