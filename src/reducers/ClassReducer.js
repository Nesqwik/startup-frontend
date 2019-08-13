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

/**
 * Fonction effectuée si postClass est rejeté.
 * @param state
 * @param action
 * @returns {*}
 */
const postClassRejected = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePostError(state.postStatus, action.payload)
        }
    });
};

/**
 * Fonction effectuée si postClass a réussi.
 * @param state
 * @param action
 * @returns {*}
 */
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

/**
 * Fonction effectuée si postClass est en attente.
 * @param state
 * @param action
 * @returns {*}
 */
const postClassPending = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        postStatus: {
            $set: ReducerUtils.updatePosting(state.postStatus)
        }
    });
};


/**
 * Fonction effectuée si fetchClasses est rejeté.
 * @param state
 * @param action
 * @returns {*}
 */
const fetchClassesRejected = (state: State, action: ReducerUtils.Action) => {
    return update(state, {
        fetchStatus: {
            $set: ReducerUtils.updateFetchError(state.fetchStatus, action.payload)
        }
    });
};

/**
 * Fonction effectuée si fetchClasses est fini.
 * @param state
 * @param action
 * @returns {*}
 */
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

/**
 * Fonction effectuée si fetchClasses est en attente.
 * @param state
 * @param action
 * @returns {*}
 */
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

/**
 * Retourne l'état de la classe
 * @param store
 * @returns {(function(State=, Action))|{postStatus: string}|classState|{postStatus}|{fetchStatus: string}|{fetchStatus}}
 */
const getState = (store: Object) => {
    return store.classState;
};

/**
 * Met à jour les classes
 * @param store
 * @returns {any[]}
 */
export const getClasses = (store: Object) => {
    let state = getState(store);
    return state.classes.allIds.map(id => state.classes.byId[id]);
};

/**
 * Met à jour une classe
 * @param store
 * @param id
 * @returns {*}
 */
export const getClass = (store: Object, id: number) => {
    let state = getState(store);
    return state.classes.byId[id];


}

/**
 * récupére l'état du post
 * @param store
 * @returns {string}
 */
export const getPostStatus = (store: Object) => {
    let state = getState(store);
    return state.postStatus;
};

/**
 * récupére l'état du fetch
 * @param store
 * @returns {string}
 */
export const getFetchStatus = (store: Object) => {
    let state = getState(store);
    return state.fetchStatus;
};