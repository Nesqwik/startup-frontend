// @flow
import * as StudentActions from "../actions/StudentActions";
import * as ReducerUtils from "./ReducerUtils";
import update from "immutability-helper";
import type {Student} from "../types/Student";
import type {WsPoints} from "../types/WsPoints";

/**
 * Etat du state studnet :
 * students:
 *  byId: map idClasse => classe
 *  allIds: Tableau idStudents
 *
 * postStatus: état de la requête d'ajout de classe.
 */
type State = {
    students: {
        byId: { [number]: Student },
        allIds: Array<number>
    },
    fetchStatus: ReducerUtils.FetchStatus,
    postStatus: ReducerUtils.PostStatus,
    updateStatus: ReducerUtils.UpdateStatus

}

const initialState: State = {
    students: {
        byId: {},
        allIds: []
    },
    fetchStatus: ReducerUtils.createFetchStatus(),
    postStatus: ReducerUtils.createPostStatus(),
    updateStatus: ReducerUtils.createUpdateStatus()
};

/**
 * Reducer pour l'élève.
 * @param state
 * @param action
 * @returns {*}
 */
const reducer = (state: State = initialState, action: ReducerUtils.Action) => {
    switch (action.type) {
        case StudentActions.ADD_STUDENT_PENDING: return addStudentPending(state);
        case StudentActions.ADD_STUDENT_FULFILLED: return addStudentFulfilled(state, action);
        case StudentActions.ADD_STUDENT_REJECTED: return addStudentRejected(state, action);
        case StudentActions.GET_STUDENTS_PENDING: return getStudentsPending(state);
        case StudentActions.GET_STUDENTS_FULFILLED: return getStudentsFulfilled(state, action);
        case StudentActions.GET_STUDENTS_REJECTED: return getStudentsRejected(state, action);
        case StudentActions.ADD_BONUS_PENDING: return addBonusPending(state);
        case StudentActions.ADD_BONUS_FULFILLED: return addBonusFulfilled(state, action);
        case StudentActions.ADD_BONUS_REJECTED: return addBonusRejected(state, action);

        case StudentActions.WS_POINT_CHANGE: return pointsChangeRt(state, action);

        default: return state
    }
};

export default reducer;

/**
 * Fonction effectuée si addStudent est en attente.
 * @param state
 * @returns {*}
 */
function addStudentPending(state: State){

    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosting(state.postStatus)
        }
    });

}

/**
 * Fonction effectuée si addStudent est fini.
 * @param state
 * @returns {*}
 */
function addStudentFulfilled(state: State, action: ReducerUtils.Action){

    let student: Student = action.payload;

    if (student.id === undefined) return state;
    let studentId: number = student.id;

    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosted(state.postStatus),
        },
        students: {
            byId: {
                [studentId]: {
                    $set: student
                }
            },
            allIds: {
                $push: [studentId]
            }
        }
    });
}

/**
 * Fonction effectuée si addStudent est rejeté.
 * @param state
 * @returns {*}
 */
function addStudentRejected(state: State, action: ReducerUtils.Action){

    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePostError(state.postStatus, action.payload)
        }
    });
}

/**
 * Fonction effectuée si getStudents est en attente.
 * @param state
 * @returns {*}
 */
function getStudentsPending(state: State){

    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetching(state.fetchStatus)
        }
    });

}

/**
 * Fonction effectuée si getStudents est fini.
 * @param state
 * @returns {*}
 */
function getStudentsFulfilled(state: State, action: ReducerUtils.Action){

    let students: Array<Student> = action.payload;

    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetched(state.fetchStatus)
        },
        students: {
            byId: {
                $set: ReducerUtils.arrayToMap(students)
            },
            allIds: {
                $set: students.map((student)=> student.id)
            }
        }
    });
}

/**
 * Fonction effectuée si getStudents est rejeté.
 * @param state
 * @returns {*}
 */
function getStudentsRejected(state: State, action: ReducerUtils.Action){

    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetchError(state.fetchStatus, action.payload)
        }
    });
}

/**
 * Fonction effectuée si addBonus est en attente.
 * @param state
 * @returns {*}
 */
function addBonusPending(state: State){

    return update(state, {
        updateStatus: {
            $set: ReducerUtils.updateUpdating(state.updateStatus)
        }
    });

}

/**
 * Fonction effectuée si addBonus est fini.
 * @param state
 * @returns {*}
 */
function addBonusFulfilled(state: State, action: ReducerUtils.Action){

    let points: Points = action.payload;

    let idStudent: number = points.idStudent;

    return update(state, {
        updateStatus: {
            $set: ReducerUtils.updateUpdated(state.updateStatus),
        },
        students: {
            byId: {
                [idStudent]: {
                    points: {
                        $set: points
                    }
                }
            }
        }
    });
}

/**
 * Permet de mettre à jour les points (pour le temps réel, lors d'un message websocket)
 * @param state
 * @param action
 * @returns {*}
 */
function pointsChangeRt(state: State, action: ReducerUtils.Action){
    let points: WsPoints = action.payload;
    let idStudent: number = points.student.id;

    return update(state, {
        students: {
            byId: {
                [idStudent]: {
                    points: {
                        $set: points
                    }
                }
            }
        }
    });
}

/**
 * Fonction effectuée si addBonus est rejeté.
 * @param state
 * @returns {*}
 */
function addBonusRejected(state: State, action: ReducerUtils.Action){

    return update(state, {
        updateStatus: {
            $set: ReducerUtils.updateUpdateError(state.updateStatus, action.payload)
        }
    });
}

/*************/
/* SELECTORS */
/*************/

/**
 * Retourne l'état du student
 * @param store
 * @returns {(function(State=, Action))|{postStatus: string}|studentState|{postStatus}|{fetchStatus: string}|{fetchStatus}}
 */
const getState = (store: Object) => {
    return store.studentState;
};

/**
 * Met à jour les students par classe
 * @param store
 * @param classId
 * @returns {any[]}
 */
export const getStudentsForClass = (store: Object, classId: number) => {
    let state = getState(store);
    return state.students.allIds.map(id => state.students.byId[id]).filter((student) => student.classroom.id === classId);
};

/**
 * récupère l'état du post
 * @param store
 * @returns {string}
 */
export const getPostStatus = (store: Object) => {
    let state = getState(store);
    return state.postStatus;
};

/**
 * récupère l'état du fetch
 * @param store
 * @returns {string}
 */
export const getFetchStatus = (store: Object) => {
    let state = getState(store);
    return state.fetchStatus;

};