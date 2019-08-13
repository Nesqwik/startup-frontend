// @flow

import type {Question} from "./Question";


/**
 * type qcm
 * id (optionnel): identifiant du qcm.
 * classroom: objet de la classe dont c'est le qcm (uniquement l'id)
 * instruction: instruction spéciale du qcm
 * questions: questions composant le qcm
 * title: titre du qcm
 */
export type QCM = {
    id?: number,
    classroom: {
        id: number
    },
    instruction: string,
    questions: Array<Question>,
    title: string
}