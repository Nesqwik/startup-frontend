//@flow
import type {QCM} from "../types/QCM";
import QCMAPI from "../api/QCMAPI";

export const POST_QCM = "POST_QCM";
export const POST_QCM_PENDING = POST_QCM + "_PENDING";
export const POST_QCM_FULFILLED = POST_QCM + "_FULFILLED";
export const POST_QCM_REJECTED = POST_QCM + "_REJECTED";


/**
 * Action permettant de créer un nouveau QCM.
 * Appel la requête de création de QCM.
 *
 * type : génère les types POST_QCM_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou le QCM créé si réussi.
 *
 * @param newQCM qcm à créer
 *
 * @returns {{type: string, payload: Promise}}
 */
export function postQCM(newQCM: QCM) {
    return {
        type: POST_QCM,
        payload: QCMAPI.postQCM(newQCM)
    }
}

export const FETCH_QCM = "FETCH_QCM";
export const FETCH_QCM_PENDING = FETCH_QCM + "_PENDING";
export const FETCH_QCM_FULFILLED = FETCH_QCM + "_FULFILLED";
export const FETCH_QCM_REJECTED = FETCH_QCM + "_REJECTED";


/**
 * Action permettant de récupérer tous les QCMs.
 * Appel la requête de récupération des QCMs.
 *
 * type : génère les types FETCH_QCM_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou le QCM créé si réussi.
 *
 * @returns {{type: string, payload: Promise}}
 */
export function fetchQCMs() {
    return {
        type: FETCH_QCM,
        payload: QCMAPI.fetchQCMs()
    }
}


export const FETCH_ANSWERS = "FETCH_ANSWERS";
export const FETCH_ANSWERS_PENDING = FETCH_ANSWERS + "_PENDING";
export const FETCH_ANSWERS_FULFILLED = FETCH_ANSWERS + "_FULFILLED";
export const FETCH_ANSWERS_REJECTED = FETCH_ANSWERS + "_REJECTED";

/**
 * Action permettant de récupérer les réponses d'un QCM.
 * Appel la requête de récupération des réponses d'un QCM.
 *
 *
 * type : génère les types FETCH_QCM_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou le QCM créé si réussi.
 *
 * @param qcmId id du QCM dont il faut récupérer les réponses
 *
 * @returns {{type: string, payload: Promise}}
 */
export function fetchAnswers(qcmId: number) {
    return {
        type: FETCH_ANSWERS,
        payload: QCMAPI.fetchAnswers(qcmId),
        meta: {
            qcmId: qcmId
        }
    }
}


export const WS_NEW_ANSWER = "WS_NEW_ANSWER";

/**
 * Action permettant de dispatcher une réponse en temps réel à une questionnaire .
 *
 * type : génère les types WS_NEW_ANSWER automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou la réponse en temps réel.
 *
 * @param answer la réponse en temps réel
 * @param qcmId l'id du QCM qui nous intéresse
 *
 * @returns {{type: string, payload: Promise}}
 */
export function wsNewAnswer(answer: WSAnswer, qcmId: number) {
    return {
        type: WS_NEW_ANSWER,
        payload: answer,
        meta: {
            qcmId: qcmId
        }
    }
}