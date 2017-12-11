// @flow
import * as StudentActions from "../actions/StudentActions";
import * as ReducerUtils from "./ReducerUtils";
import update from "immutability-helper";
import type {Student} from "../types/Student";

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

        default: return state
    }
};

export default reducer;

function addStudentPending(state: State){

    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosting(state.postStatus)
        }
    });

}

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

function addStudentRejected(state: State, action: ReducerUtils.Action){

    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePostError(state.postStatus, action.payload)
        }
    });
}

function getStudentsPending(state: State){

    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetching(state.fetchStatus)
        }
    });

}

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

function getStudentsRejected(state: State, action: ReducerUtils.Action){

    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetchError(state.fetchStatus, action.payload)
        }
    });
}

function addBonusPending(state: State){

    return update(state, {
        updateStatus: {
            $set: ReducerUtils.updateUpdating(state.updateStatus)
        }
    });

}

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

const getState = (store: Object) => {
    return store.studentState;
};

export const getStudentsForClass = (store: Object, classId: number) => {
    let state = getState(store);
    return state.students.allIds.map(id => state.students.byId[id]).filter((student) => student.classroom.id === classId);
};

export const getPostStatus = (store: Object) => {
    let state = getState(store);
    return state.postStatus;
};

export const getFetchStatus = (store: Object) => {
    let state = getState(store);
    return state.fetchStatus;

};