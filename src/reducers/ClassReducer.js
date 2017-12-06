// @flow
import * as ClassActions from "../actions/ClassActions";
import type {Classroom} from "../types/Classroom";
import * as ReducerUtils from "./ReducerUtils";
import update from "immutability-helper";

/**
 * Etat du state class :
 * classes:
 *  byId: map idClasse => classe
 *  allIds: Tableau idClass
 *
 * postStatus: état de la requête d'ajout de classe.
 */
type State = {
    classes: {
        byId: { [number]: Classroom },
        allIds: Array<number>
    },
    postStatus: ReducerUtils.PostStatus,
    fetchStatus: ReducerUtils.FetchStatus
}

const initialState: State = {
    classes: {
        byId: {},
        allIds: []
    },
    postStatus: ReducerUtils.createPostStatus(),
    fetchStatus: ReducerUtils.createFetchStatus()
};

/**
 * Reducer pour la classe.
 * @param state
 * @param action
 * @returns {*}
 */
const reducer = (state: State = initialState, action: ReducerUtils.Action) => {
    switch (action.type) {
        case ClassActions.POST_CLASS_PENDING:
            return postClassPending(state, action);
        case ClassActions.POST_CLASS_FULFILLED:
            return postClassFulfilled(state, action);
        case ClassActions.POST_CLASS_REJECTED:
            return postClassRejected(state, action);

        case ClassActions.FETCH_CLASSES_PENDING:
            return fetchClassesPending(state, action);
        case ClassActions.FETCH_CLASSES_FULFILLED:
            return fetchClassesFulfilled(state, action);
        case ClassActions.FETCH_CLASSES_REJECTED:
            return fetchClassesRejected(state, action);

        default:
            return state
    }
};


const postClassRejected = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePostError(state.postStatus, action.payload)
        }
    });
};

const postClassFulfilled = (state: State, action: ReducerUtils.Action) => {
    let classroom: Classroom = action.payload;

    if (classroom.id === undefined) return state;
    let classroomId: number = classroom.id;

    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosted(state.postStatus),
        },
        classes: {
            byId: {
                [classroomId]: {
                    $set: classroom
                }
            },
            allIds: {
                $push: [classroomId]
            }
        }
    });
};

const postClassPending = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosting(state.postStatus)
        }
    });
};


const fetchClassesRejected = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetchError(state.fetchStatus, action.payload)
        }
    });
};

const fetchClassesFulfilled = (state: State, action: ReducerUtils.Action) => {
    let classrooms: Array<Classroom> = action.payload;

    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetched(state.fetchStatus),
        },
        classes: {
            byId: {
                $set: ReducerUtils.arrayToMap(classrooms)
            },
            allIds: {
                $set: classrooms.map((classroom: Classroom) => classroom.id)
            }
        }
    });
};

const fetchClassesPending = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetching(state.fetchStatus)
        }
    });
};

export default reducer;


/*************/
/* SELECTORS */
/*************/

const getState = (store: Object) => {
    return store.classState;
};

export const getClasses = (store: Object) => {
    let state = getState(store);
    return state.classes.allIds.map(id => state.classes.byId[id]);
};

export const getPostStatus = (store: Object) => {
    let state = getState(store);
    return state.postStatus;
};

export const getFetchStatus = (store: Object) => {
    let state = getState(store);
    return state.fetchStatus;
};