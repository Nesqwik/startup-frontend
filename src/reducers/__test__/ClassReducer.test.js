import classReducer from "../ClassReducer";
import * as ClassSelectors from "../ClassReducer";
import type {Classroom} from "../../types/Classroom";

describe("ClassReducer.js", () => {

    test("initialValue", () => {
        let expected = {
            classes: {
                byId: {},
                allIds: []
            },
            postStatus: {
                posting: false,
                posted: false,
                postError: null
            },
            fetchStatus: {
                fetching: false,
                fetched: false,
                fetchError: null
            }
        };

        let actual = classReducer(undefined, {
            type: "NONE"
        });

        expect(actual).toEqual(expected);
    });


    test("When Action POST_CLASS_PENDING", () => {
        let initialValue = {
            postStatus: {
                posting: false
            }
        };

        let expected = {
            postStatus: {
                posting: true
            }
        };

        let actual = classReducer(initialValue, {
            type: "POST_CLASS_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action POST_CLASS_FULFILLED", () => {
        let initialValue = {
            postStatus: {
                posting: true,
                posted: false
            },
            classes: {
                byId: {},
                allIds: []
            }
        };

        // Example of data returned by the API Call
        let classroom: Classroom = {
            id: 1,
            value: "classe de test"
        };

        let expected = {
            postStatus: {
                posting: false,
                posted: true
            },
            classes: {
                byId: {1: classroom},
                allIds: [1]
            }
        };

        let actual = classReducer(initialValue, {
            type: "POST_CLASS_FULFILLED",
            payload: classroom
        });

        expect(actual).toEqual(expected);
    });

    test("When Action POST_CLASS_FULFILLED with no class id", () => {
        let initialValue = {
            postStatus: {
                posting: true,
                posted: false
            },
            classes: {
                byId: {},
                allIds: []
            }
        };

        // Example of data returned by the API Call
        let classroom: Classroom = {
            value: "classe de test"
        };

        let expected = initialValue;

        let actual = classReducer(initialValue, {
            type: "POST_CLASS_FULFILLED",
            payload: classroom
        });

        expect(actual).toEqual(expected);
    });


    test("When Action POST_CLASS_REJECTED", () => {
        let initialValue = {
            postStatus: {
                posting: false,
                postError: null
            }
        };

        let expected = {
            postStatus: {
                posting: false,
                postError: "Erreur"
            }
        };

        let actual = classReducer(initialValue, {
            type: "POST_CLASS_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });


    test("selector getPostStatus", () => {
        let globalStore = {
            classState: {
                postStatus: "any data"
            }
        };

        let expected = "any data";

        let actual = ClassSelectors.getPostStatus(globalStore);

        expect(actual).toEqual(expected);
    });

    test("selector getFetchStatus", () => {
        let globalStore = {
            classState: {
                fetchStatus: "any data"
            }
        };

        let expected = "any data";

        let actual = ClassSelectors.getFetchStatus(globalStore);

        expect(actual).toEqual(expected);
    });
});