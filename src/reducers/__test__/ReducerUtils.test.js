// @flow
import * as ReducerUtils from "../ReducerUtils";

describe("ReducerUtils.js", () => {


    // GENERIC FUNCTIONS
    test('createStatus', () => {
        let expected = {
            testing: false,
            tested: false,
            testError: null
        };

        let actual = ReducerUtils.createStatus("testing", "tested", "testError");

        expect(actual).toEqual(expected);
    });


    test('updatePending', () => {
        let status = ReducerUtils.createStatus("testing", "tested", "testError");
        let expected = {
            testing: true,
            tested: false,
            testError: null
        };
        let actual = ReducerUtils.updatePending(status, "testing");

        expect(actual).toEqual(expected);
    });


    test('updateReceived', () => {
        let status = ReducerUtils.createStatus("testing", "tested", "testError");
        let expected = {
            testing: false,
            tested: true,
            testError: null
        };
        let actual = ReducerUtils.updateReceived(status, "testing", "tested");

        expect(actual).toEqual(expected);
    });

    test('updateRejected', () => {
        let status = ReducerUtils.createStatus("testing", "tested", "testError");
        let expected = {
            testing: false,
            tested: false,
            testError: "error message"
        };
        let actual = ReducerUtils.updateRejected(status, "error message", "testing", "testError");

        expect(actual).toEqual(expected);
    });

    // FETCH FUNCTIONS
    test('createFetchStatus', () => {
        let actual = ReducerUtils.createFetchStatus();
        let expected = {
            fetching: false,
            fetched: false,
            fetchError: null
        };

        expect(actual).toEqual(expected);
    });

    test('updateFetching', () => {
        let status = ReducerUtils.createFetchStatus();
        let expected = {
            fetching: true,
            fetched: false,
            fetchError: null
        };
        let actual = ReducerUtils.updateFetching(status);

        expect(actual).toEqual(expected);
    });

    test('updateFetched', () => {
        let status = ReducerUtils.createFetchStatus();
        let expected = {
            fetching: false,
            fetched: true,
            fetchError: null
        };
        let actual = ReducerUtils.updateFetched(status);

        expect(actual).toEqual(expected);
    });

    test('updateFetchError', () => {
        let status = ReducerUtils.createFetchStatus();
        let expected = {
            fetching: false,
            fetched: false,
            fetchError: "erreur"
        };
        let actual = ReducerUtils.updateFetchError(status, "erreur");

        expect(actual).toEqual(expected);
    });

    // POST FUNCTIONS
    test('createPostStatus', () => {
        let actual = ReducerUtils.createPostStatus();
        let expected = {
            posting: false,
            posted: false,
            postError: null
        };

        expect(actual).toEqual(expected);
    });

    test('updatePosting', () => {
        let status = ReducerUtils.createPostStatus();
        let expected = {
            posting: true,
            posted: false,
            postError: null
        };
        let actual = ReducerUtils.updatePosting(status);

        expect(actual).toEqual(expected);
    });

    test('updatePosted', () => {
        let status = ReducerUtils.createPostStatus();
        let expected = {
            posting: false,
            posted: true,
            postError: null
        };
        let actual = ReducerUtils.updatePosted(status);

        expect(actual).toEqual(expected);
    });

    test('updatePostError', () => {
        let status = ReducerUtils.createPostStatus();
        let expected = {
            posting: false,
            posted: false,
            postError: "erreur"
        };
        let actual = ReducerUtils.updatePostError(status, "erreur");

        expect(actual).toEqual(expected);
    });


    // DELETE FUNCTIONS
    test('createDeleteStatus', () => {
        let actual = ReducerUtils.createDeleteStatus();
        let expected = {
            deleting: false,
            deleted: false,
            deleteError: null
        };

        expect(actual).toEqual(expected);
    });

    test('updatePosting', () => {
        let status = ReducerUtils.createDeleteStatus();
        let expected = {
            deleting: true,
            deleted: false,
            deleteError: null
        };
        let actual = ReducerUtils.updateDeleting(status);

        expect(actual).toEqual(expected);
    });

    test('updatePosted', () => {
        let status = ReducerUtils.createDeleteStatus();
        let expected = {
            deleting: false,
            deleted: true,
            deleteError: null
        };
        let actual = ReducerUtils.updateDeleted(status);

        expect(actual).toEqual(expected);
    });

    test('updatePostError', () => {
        let status = ReducerUtils.createDeleteStatus();
        let expected = {
            deleting: false,
            deleted: false,
            deleteError: "erreur"
        };
        let actual = ReducerUtils.updateDeleteError(status, "erreur");

        expect(actual).toEqual(expected);
    });


    // UPDATE FUNCTIONS
    test('createDeleteStatus', () => {
        let actual = ReducerUtils.createUpdateStatus();
        let expected = {
            updating: false,
            updated: false,
            updateError: null
        };

        expect(actual).toEqual(expected);
    });

    test('updatePosting', () => {
        let status = ReducerUtils.createUpdateStatus();
        let expected = {
            updating: true,
            updated: false,
            updateError: null
        };
        let actual = ReducerUtils.updateUpdating(status);

        expect(actual).toEqual(expected);
    });

    test('updatePosted', () => {
        let status = ReducerUtils.createUpdateStatus();
        let expected = {
            updating: false,
            updated: true,
            updateError: null
        };
        let actual = ReducerUtils.updateUpdated(status);

        expect(actual).toEqual(expected);
    });

    test('updatePostError', () => {
        let status = ReducerUtils.createUpdateStatus();
        let expected = {
            updating: false,
            updated: false,
            updateError: "erreur"
        };
        let actual = ReducerUtils.updateUpdateError(status, "erreur");

        expect(actual).toEqual(expected);
    });


    test('arrayToMap with default id', () => {
        let array = [
            {
                id: 1,
                value: "toto"
            }, {
                id: 2,
                value: "tata"
            }
        ];

        let expected = {
            "1": {
                id: 1,
                value: "toto"
            },
            "2": {
                id: 2,
                value: "tata"
            }
        };

        let actual = ReducerUtils.arrayToMap(array);

        expect(actual).toEqual(expected);
    });


    test('arrayToMap with specified id', () => {
        let array = [
            {
                idObj: 1,
                value: "toto"
            }, {
                idObj: 2,
                value: "tata"
            }
        ];

        let expected = {
            "1": {
                idObj: 1,
                value: "toto"
            },
            "2": {
                idObj: 2,
                value: "tata"
            }
        };

        let actual = ReducerUtils.arrayToMap(array, "idObj");

        expect(actual).toEqual(expected);
    });

});