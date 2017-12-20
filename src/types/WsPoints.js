// @flow

/**
 * Type WsPoints
 * Représente un message temps réel d'ajout de point.
 */
export type WsPoints = {
    bonus: number,
    malus: number,
    student: {
        id: number
    }
}