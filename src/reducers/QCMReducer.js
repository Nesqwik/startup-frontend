// @flow
import * as ReducerUtils from "./ReducerUtils";
import update from "immutability-helper";
import * as QCMAction from "../actions/QCMActions";
import type {QCM} from "../types/QCM";
import type {StudentAnswers} from "../types/StudentAnswer";
import type {WSAnswer} from "../types/WSAnswer";

/**
 * Etat du state class :
 * qcm:
 *  byId: map idQCM => qcm
 *  allIds: Tableau idQCM
 *
 * postStatus: état de la requête d'ajout de classe.
 */
type State = {
    qcms: {
        byId: { [number]: QCM },
        allIds: Array<number>
    },
    answers: {
        [number]: {
            byId: { [number]: StudentAnswers },
            allIds: Array<number>
        }
    },
    postStatus: ReducerUtils.PostStatus,
    fetchQCMStatus: ReducerUtils.FetchStatus,
    fetchAnswersStatus: ReducerUtils.FetchStatus
}

const initialState: State = {
    qcms: {
        byId: {},
        allIds: []
    },
    answers: {},
    postStatus: ReducerUtils.createPostStatus(),
    fetchQCMStatus: ReducerUtils.createFetchStatus(),
    fetchAnswersStatus: ReducerUtils.createFetchStatus()
};

/**
 * //TODO Louis
 * @param answersMap
 * @returns {{byId: *, allIds: void}}
 */
function newAnswerState(answersMap) {
    return {
        byId: answersMap,
        allIds: Object.values(answersMap).forEach((e: StudentAnswers) => e.answerId)
    };
}

/**
 * Reducer pour les QCMs.
 * @param state
 * @param action
 * @returns {*}
 */
const reducer = (state: State = initialState, action: ReducerUtils.Action) => {
    switch (action.type) {
        case QCMAction.POST_QCM_PENDING:
            return postQCMPending(state, action);
        case QCMAction.POST_QCM_FULFILLED:
            return postQCMFulfilled(state, action);
        case QCMAction.POST_QCM_REJECTED:
            return postQCMRejected(state, action);
        case QCMAction.FETCH_QCM_PENDING:
            return fetchQCMPending(state, action);
        case QCMAction.FETCH_QCM_FULFILLED:
            return fetchQCMFulfilled(state, action);
        case QCMAction.FETCH_QCM_REJECTED:
            return fetchQCMRejected(state, action);

        case QCMAction.FETCH_ANSWERS_PENDING:
            return fetchAnswersPending(state, action);
        case QCMAction.FETCH_ANSWERS_FULFILLED:
            return fetchAnswersFulfilled(state, action);
        case QCMAction.FETCH_ANSWERS_REJECTED:
            return fetchAnswersRejected(state, action);

        case QCMAction.WS_NEW_ANSWER:
            return addNewAnswer(state, action);


        default:
            return state
    }
};

/**
 * //TODO Louis
 * @param state
 * @param action
 * @returns {*}
 */
const addNewAnswer = (state: State, action: ReducerUtils.Action) => {
    let qcmId = action.meta.qcmId;
    let wsAnswer: WSAnswer = action.payload;

    let lastAnswers = state.answers[qcmId];

    if(!lastAnswers) lastAnswers = newAnswerState({});

    if(!lastAnswers.byId[wsAnswer.idAnswer])
        lastAnswers.byId[wsAnswer.idAnswer] = {
            studentIds: [],
            answerId: wsAnswer.idAnswer
        };

    let newAnswer = update(lastAnswers, {
        byId: {
            [wsAnswer.idAnswer]: {
                studentIds: {
                    $push: [wsAnswer.idStudent]
                }
            }
        }
    });

    return update(state, {
        answers: {
            [qcmId]: {
                $set: newAnswer
            }
        }
    });
};

/**
 * fonction effectuée si le post QCM est rejeté
 * @param state
 * @param action
 * @returns {*}
 */
const postQCMRejected = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePostError(state.postStatus, action.payload)
        }
    });
};

/**
 *  fonction effectuée si le post QCM est fini
 * @param state
 * @param action
 * @returns {*}
 */
const postQCMFulfilled = (state: State, action: ReducerUtils.Action) => {
    let newQcm: QCM = action.payload;
    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosted(state.postStatus),
        },
        qcms: {
            byId: {
                [newQcm.id]: {
                    $set: newQcm
                }
            },
            allIds: {
                $push: [newQcm.id]
            }
        }
    });
};

/**
 * fonction effectuée si le post QCM est en attente
 * @param state
 * @param action
 * @returns {*}
 */
const postQCMPending = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosting(state.postStatus)
        }
    });
};

/**
 * fonction effectuée si le fetch QCM est rejeté
 * @param state
 * @param action
 * @returns {*}
 */
const fetchQCMRejected = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        fetchQCMStatus: {
            $set: ReducerUtils.updateFetchError(state.fetchQCMStatus, action.payload)
        }
    });
};

/**
 * fonction effectuée si le fetch QCM est fini
 * @param state
 * @param action
 * @returns {*}
 */
const fetchQCMFulfilled = (state: State, action: ReducerUtils.Action) => {

    let qcms: Array<QCM> = action.payload;

    return update(state, {
        fetchQCMStatus: {
            $set: ReducerUtils.updateFetched(state.fetchQCMStatus),
        },
        qcms: {
            byId: {
                $set: ReducerUtils.arrayToMap(qcms)
            },
            allIds: {
                $set: qcms.map(qcm => qcm.id)
            }
        }
    });
};

/**
 * fonction effectuée si le fetch QCM est en attente
 * @param state
 * @param action
 * @returns {*}
 */
const fetchQCMPending = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        fetchQCMStatus: {
            $set: ReducerUtils.updateFetching(state.fetchQCMStatus)
        }
    });
};

/**
 * fonction effectuée si le fetch Answers est rejeté
 * @param state
 * @param action
 * @returns {*}
 */
const fetchAnswersRejected = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        fetchAnswersStatus: {
            $set: ReducerUtils.updateFetchError(state.fetchAnswersStatus, action.payload)
        }
    });
};

/**
 * //TODO Louis
 * @param answers
 * @returns {{}}
 */
function getAnswerMap(answers: Array<Object>) {
    let map = {};

    answers.forEach(item => {
        let answerId = item.answer.id;
        let studentId = item.student.id;

        if (!map[answerId]) {
            map[answerId] = {
                answerId: answerId,
                studentIds: []
            };
        }

        map[answerId].studentIds.push(studentId);
    });

    return map;
}

/**
 * fonction effectuée si le fetch Answers est fini
 * @param state
 * @param action
 * @returns {*}
 */
const fetchAnswersFulfilled = (state: State, action: ReducerUtils.Action) => {
    let answersMap: { [number]: StudentAnswers } = getAnswerMap(action.payload);
    let qcmId: number = action.meta.qcmId;

    return update(state, {
        fetchAnswersStatus: {
            $set: ReducerUtils.updateFetched(state.fetchAnswersStatus),
        },
        answers: {
            [qcmId]: {
                $set: newAnswerState(answersMap)
            }
        }
    });
};

/**
 * fonction effectuée si le fetch Answers est en attente
 * @param state
 * @param action
 * @returns {*}
 */
const fetchAnswersPending = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        fetchAnswersStatus: {
            $set: ReducerUtils.updateFetching(state.fetchAnswersStatus)
        }
    });
};

export default reducer;


/*************/
/* SELECTORS */
/*************/

/**
 * récupère l'état du QCM
 * @param store
 * @returns {function(State=, Action)}
 */
const getState = (store: Object) => {
    return store.QCMState;
};

/**
 * met à jour les QCM par classe
 * @param store
 * @param classId id de la classe
 * @returns {any[]}
 */
export const getQCMPerClass = (store: Object, classId: number) => {
    let state = getState(store);
    return state.qcms.allIds.map(id => state.qcms.byId[id]).filter((qcm: QCM) => qcm.classroom.id === classId);
};

/**
 * met à jour un qcm
 * @param store
 * @param qcmId l'id du qcm
 * @returns {*}
 */
export const getQCM = (store: Object, qcmId: number) => {
    let state = getState(store);
    return state.qcms.byId[qcmId];
};

/**
 * récupère l'état du post
 * @param store
 */
export const getPostStatus = (store: Object) => {
    let state = getState(store);
    return state.postStatus;
};

/**
 * récupère les réponses du qcm
 * @param store
 * @param qcmId l'id du qcm
 * @returns {*}
 */
export const getQcmAnswers = (store: Object, qcmId: number) => {
    let state = getState(store);
    if(!state.answers[qcmId]) return {};
    return state.answers[qcmId].byId;
};

/**
 * récupère l'état du fetch QCM
 * @param store
 * @returns {FetchStatus|FetchStatus|*|fetchQCMStatus|{$set}}
 */
export const getFetchQCMStatus = (store: Object) => {
    let state = getState(store);
    return state.fetchQCMStatus;
};

/**
 * récupère l'état du fetch answers
 * @param store
 * @returns {FetchStatus|FetchStatus|*|fetchAnswersStatus|{$set}}
 */
export const getFetchAnswersStatus = (store: Object) => {
    let state = getState(store);
    return state.fetchAnswersStatus;
};