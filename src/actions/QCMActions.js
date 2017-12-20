//@flow
import type {QCM} from "../types/QCM";
import QCMAPI from "../api/QCMAPI";

export const POST_QCM = "POST_QCM";
export const POST_QCM_PENDING = POST_QCM + "_PENDING";
export const POST_QCM_FULFILLED = POST_QCM + "_FULFILLED";
export const POST_QCM_REJECTED = POST_QCM + "_REJECTED";

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

export function wsNewAnswer(answer: WSAnswer, qcmId: number) {
    return {
        type: WS_NEW_ANSWER,
        payload: answer,
        meta: {
            qcmId: qcmId
        }
    }
}