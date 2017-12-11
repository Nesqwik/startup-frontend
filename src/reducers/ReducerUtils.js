// @flow

/**
 * Action de base (requis: type)
 */
export type Action = Object & {
    type: string
}

/**
 * Etat d'une requête GET (fetch)
 * fetching : true si requête en cours, faux sinon.
 * fetched: true si requête réussie. Faux sinon.
 * fetchError: erreur renvoyée par la requête.
 */
export type FetchStatus = {
    fetching: boolean,
    fetched: boolean,
    fetchError: any
}

/**
 * Etat d'une requête POST
 * posting : true si requête en cours, faux sinon.
 * posted: true si requête réussie. Faux sinon.
 * postError: erreur renvoyée par la requête.
 */
export type PostStatus = {
    posting: boolean,
    posted: boolean,
    postError: any
}

/**
 * Etat d'une requête DELETE
 * deleting : true si requête en cours, faux sinon.
 * deleted: true si requête réussie. Faux sinon.
 * deleteError: erreur renvoyée par la requête.
 */
export type DeleteStatus = {
    deleting: boolean,
    deleted: boolean,
    deleteError: any
}

/**
 * Etat d'une requête PUT (update)
 * updating : true si requête en cours, faux sinon.
 * updated: true si requête réussie. Faux sinon.
 * updateError: erreur renvoyée par la requête.
 */
export type UpdateStatus = {
    updating: boolean,
    updated: boolean,
    updateStatus: any
}

/**
 * créateur d'état générique.
 * @param ing
 * @param ed
 * @param error
 * @returns {{}}
 */
export const createStatus = (ing: string, ed: string, error: string): Object => {
    return {
        [ing]: false,
        [ed]: false,
        [error]: null
    }
};

/**
 * Modifieur d'état de requête en cours générique.
 * @param status
 * @param ing
 * @returns {{}}
 */
export const updatePending = (status: Object, ing: string): Object => {
    return {
        ...status,
        [ing]: true
    }
};

/**
 * Modifieur d'état de requête réussie générique.
 * @param status
 * @param ing
 * @param ed
 * @returns {{}}
 */
export const updateReceived = (status: Object, ing: string, ed: string): Object => {
    return {
        ...status,
        [ing]: false,
        [ed]: true
    }
};

/**
 * Modifieur d'état de requête ratée générique.
 * @param status
 * @param errorData
 * @param ing
 * @param error
 * @returns {{}}
 */
export const updateRejected = (status: Object, errorData: any, ing: string, error: string): Object => {
    return {
        ...status,
        [ing]: false,
        [error]: errorData
    }
};


// FETCHING
const FETCHING = "fetching";
const FETCHED = "fetched";
const FETCH_ERROR = "fetchError";

/**
 * créateur d'état fetch
 * @returns {{}}
 */
export const createFetchStatus = (): FetchStatus => {
    return createStatus(FETCHING, FETCHED, FETCH_ERROR);
};

/**
 * modifieur d'état de requête GET
 * @param status
 * @returns {{}}
 */
export const updateFetching = (status: FetchStatus): FetchStatus => {
    return updatePending(status, FETCHING);
};

/**
 * modifieur d'état de requête GET
 * @param status
 * @returns {{}}
 */
export const updateFetched = (status: FetchStatus): FetchStatus => {
    return updateReceived(status, FETCHING, FETCHED);
};

/**
 * modifieur d'état de requête GET
 * @param status
 * @param error
 * @returns {{}}
 */
export const updateFetchError = (status: FetchStatus, error: string): FetchStatus => {
    return updateRejected(status, error, FETCHING, FETCH_ERROR);
};


// POSTING
const POSTING = "posting";
const POSTED = "posted";
const POST_ERROR = "postError";

/**
 * créateur d'état post
 * @returns {{}}
 */
export const createPostStatus = (): PostStatus => {
    return createStatus(POSTING, POSTED, POST_ERROR);
};

/**
 * modifieur d'état de requête POST
 * @param status
 * @returns {{}}
 */
export const updatePosting = (status: PostStatus): PostStatus => {
    return updatePending(status, POSTING);
};

/**
 * modifieur d'état de requête POST
 * @param status
 * @returns {{}}
 */
export const updatePosted = (status: PostStatus): PostStatus => {
    return updateReceived(status, POSTING, POSTED);
};

/**
 * modifieur d'état de requête POST
 * @param status
 * @param error
 * @returns {{}}
 */
export const updatePostError = (status: PostStatus, error: string): PostStatus => {
    return updateRejected(status, error, POSTING, POST_ERROR);
};

// DELETING
const DELETING = "deleting";
const DELETED = "deleted";
const DELETE_ERROR = "deleteError";

/**
 * créateur d'état delete
 * @returns {{}}
 */
export const createDeleteStatus = (): DeleteStatus => {
    return createStatus(DELETING, DELETED, DELETE_ERROR);
};

/**
 * modifieur d'état de requête DELETE
 * @param status
 * @returns {{}}
 */
export const updateDeleting = (status: DeleteStatus): DeleteStatus => {
    return updatePending(status, DELETING);
};

/**
 * modifieur d'état de requête DELETE
 * @param status
 * @returns {{}}
 */
export const updateDeleted = (status: DeleteStatus): DeleteStatus => {
    return updateReceived(status, DELETING, DELETED);
};

/**
 * modifieur d'état de requête DELETE
 * @param status
 * @param error
 * @returns {{}}
 */
export const updateDeleteError = (status: DeleteStatus, error: string): DeleteStatus => {
    return updateRejected(status, error, DELETING, DELETE_ERROR);
};

// UPDATING
const UPDATING = "updating";
const UPDATED = "updated";
const UPDATE_ERROR = "updateError";
/**
 * créateur d'état update
 * @returns {{}}
 */
export const createUpdateStatus = (): UpdateStatus => {
    return createStatus(UPDATING, UPDATED, UPDATE_ERROR);
};

/**
 * modifieur d'état de requête PUT (update)
 * @param status
 * @returns {{}}
 */
export const updateUpdating = (status: UpdateStatus): UpdateStatus => {
    return updatePending(status, UPDATING);
};

/**
 * modifieur d'état de requête PUT (update)
 * @param status
 * @returns {{}}
 */
export const updateUpdated = (status: UpdateStatus): UpdateStatus => {
    return updateReceived(status, UPDATING, UPDATED);
};

/**
 * modifieur d'état de requête PUT (update)
 * @param status
 * @param error
 * @returns {{}}
 */
export const updateUpdateError = (status: UpdateStatus, error: string): UpdateStatus => {
    return updateRejected(status, error, UPDATING, UPDATE_ERROR);
};


/**
 * Transforme un tableau d'objet en une map idObjet => Objet
 * @param array Le tableau à transformer
 * @param idAttr le nom de l'attribut à prendre en temps qu'id ("id" par défaut)
 * @returns {*}
 */
export const arrayToMap = (array: Array<any>, idAttr?: string) => {
    let obj = {};
    if(!idAttr) idAttr = "id";

    array.forEach((item: any) => {
        let id: any = item[idAttr];
        obj[id] = item;
    });
    return obj;

};
