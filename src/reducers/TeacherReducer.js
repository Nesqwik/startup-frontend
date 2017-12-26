// @flow
import * as ReducerUtils from "./ReducerUtils";
import update from "immutability-helper";
import * as TeacherActions from "../actions/TeacherActions";

/**
 * postStatus: état de la requête d'ajout de classe.
 */
type State = {
    postStatusSubscription: ReducerUtils.PostStatus,

}

const initialState: State = {
    postStatusSubscription: ReducerUtils.createPostStatus(),
};

/**
 * Reducer pour l'enseignant.
 * @param state
 * @param action
 * @returns {*}
 */
const reducer = (state: State = initialState, action: ReducerUtils.Action) => {
    switch (action.type) {
        case TeacherActions.SUBSCRIBE_TEACHER_PENDING: return subscribeTeacherPending(state);
        case TeacherActions.SUBSCRIBE_TEACHER_FULFILLED: return subscribeTeacherFulfilled(state, action);
        case TeacherActions.SUBSCRIBE_TEACHER_REJECTED: return subscribeTeacherRejected(state, action);

        default: return state
    }
};

export default reducer;

function subscribeTeacherPending(state: State){

    return update(state, {
        postStatusSubscription: {
            $set: ReducerUtils.updatePosting(state.postStatus)
        }
    });

}

function subscribeTeacherFulfilled(state: State, action: ReducerUtils.Action){

    return update(state, {
        postStatusSubscription: {
            $set: ReducerUtils.updatePosted(state.postStatus),
        }
    });
}

function subscribeTeacherRejected(state: State, action: ReducerUtils.Action){

    return update(state, {
        postStatusSubscription: {
            $set: ReducerUtils.updatePostError(state.postStatus, action.payload)
        }
    });
}


/*************/
/* SELECTORS */
/*************/

const getState = (store: Object) => {
    return store.studentState;
};


export const getPostStatusSubscription = (store: Object) => {
    let state = getState(store);
    return state.postStatusSubscription;
};

