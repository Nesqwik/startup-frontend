import qcmReducer from "../QCMReducer";
import * as QCMSelectors from "../QCMReducer";
import type {QCM} from "../../types/QCM";
import type {Student} from "../../types/Student";
import studentReducer from "../StudentReducer";
import type {Answer} from "../../types/Answer";

describe("QCMReducer.js", () => {

    test("initialValue", () => {
        let expected =
            {
                answers: {},
                fetchAnswersStatus:
                    {
                        fetchError: null,
                        fetched: false, fetching: false
                    },
                fetchQCMStatus:
                    {
                        fetchError: null,
                        fetched: false,
                        fetching: false
                    },
                postStatus:
                    {
                        postError: null,
                        posted: false,
                        posting: false
                    },
                qcms:
                    {
                        allIds: [],
                        byId: {}
                    }
            }



        let actual = qcmReducer(undefined, {
            type: "NONE"
        });

        expect(actual).toEqual(expected);
    });


    test("When Action POST_QCM_PENDING", () => {
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

        let actual = qcmReducer(initialValue, {
            type: "POST_QCM_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action POST_QCM_FULFILLED", () => {
        let initialValue = {
            postStatus: {
                posting: true,
                posted: false
            },
            qcms: {
                byId: {},
                allIds: []
            }
        };

        // Example of data returned by the API Call
        let qcm: QCM = {
            id: 1,
            classroom: {
                id: 1
            },
            instruction: "",
            questions: [],
            title: ""
        };

        let expected = {
            postStatus: {
                posting: false,
                posted: true
            },
            qcms: {
                byId: {1: qcm},
                allIds: [1]
            }
        };

        let actual = qcmReducer(initialValue, {
            type: "POST_QCM_FULFILLED",
            payload: qcm
        });

        expect(actual).toEqual(expected);
    });

    test("When Action POST_QCM_REJECTED", () => {
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

        let actual = qcmReducer(initialValue, {
            type: "POST_QCM_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action FETCH_QCM_PENDING", () => {
        let initialValue = {
            fetchQCMStatus: {
                fetching: false
            }
        };

        let expected = {
            fetchQCMStatus: {
                fetching: true
            }
        };

        let actual = qcmReducer(initialValue, {
            type: "FETCH_QCM_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action FETCH_QCM_FULFILLED", () => {
        let initialValue = {
            fetchQCMStatus: {
                fetching: true,
                fetched: false
            },
            qcms: {
                byId: {},
                allIds: []
            }
        };


        // Example of data returned by the API Call
        let qcms: Array<QCM> = [{
            id: 1,
            classroom: {
                id: 1
            },
            instruction: "",
            questions: [],
            title: ""
        },
            {
                id: 2,
                classroom: {
                    id: 1
                },
                instruction: "",
                questions: [],
                title: ""
            }];

        let expected = {
            fetchQCMStatus: {
                fetching: false,
                fetched: true
            },
            qcms: {
                byId: {1 : qcms[0], 2: qcms[1]},
                allIds: [1, 2]
            }
        };

        let actual = qcmReducer(initialValue, {
            type: "FETCH_QCM_FULFILLED",
            payload: qcms
        });

        expect(actual).toEqual(expected);
    });


    test("When Action FETCH_QCM_REJECTED", () => {
        let initialValue = {
            fetchQCMStatus: {
                fetching: false,
                fetchError: null
            }
        };

        let expected = {
            fetchQCMStatus: {
                fetching: false,
                fetchError: "Erreur"
            }
        };

        let actual = qcmReducer(initialValue, {
            type: "FETCH_QCM_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });

    //TODO: Louis: temps réels + ce qui suit
    /*test("When Action FETCH_ANSWERS_PENDING", () => {
        let initialValue = {
            fetchAnswersStatus: {
                fetching: false
            }
        };

        let expected = {
            fetchAnswersStatus: {
                fetching: true
            }
        };

        let actual = qcmReducer(initialValue, {
            type: "FETCH_ANSWERS_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action FETCH_ANSWERS_FULFILLED", () => {
        let initialValue = {
            fetchAnswersStatus: {
                fetching: true,
                fetched: false
            },
            answers: {}
        };


        // Example of data returned by the API Call
        let answers: Array<Answer> = [{
            choice: "",
            good: false,
            id: 1
        },
            {
                choice: "",
                good: true,
                id: 2
            }];

        let expected = {
            fetchAnswersStatus: {
                fetching: false,
                fetched: true
            },
            answers: {1: {
                byId: {1 : answers[0], 2: answers[1]},
                allIds: [1, 2]
            },}
        };

        let actual = qcmReducer(initialValue, {
            type: "FETCH_ANSWERS_FULFILLED",
            payload: answers
        });

        expect(actual).toEqual(expected);
    });


    test("When Action FETCH_ANSWERS_REJECTED", () => {
        let initialValue = {
            fetchAnswersStatus: {
                fetching: false,
                fetchError: null
            }
        };

        let expected = {
            fetchAnswersStatus: {
                fetching: false,
                fetchError: "Erreur"
            }
        };

        let actual = qcmReducer(initialValue, {
            type: "FETCH_ANSWERS_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });*/


    test("selector getPostStatus", () => {
        let globalStore = {
            QCMState: {
                postStatus: "any data"
            }
        };

        let expected = "any data";

        let actual = QCMSelectors.getPostStatus(globalStore);

        expect(actual).toEqual(expected);
    });

    test("selector getFetchQCMStatus", () => {
        let globalStore = {
            QCMState: {
                fetchQCMStatus: "any data"
            }
        };

        let expected = "any data";

        let actual = QCMSelectors.getFetchQCMStatus(globalStore);

        expect(actual).toEqual(expected);
    });

    test("selector getFetchAnswersStatus", () => {
        let globalStore = {
            QCMState: {
                fetchAnswersStatus: "any data"
            }
        };

        let expected = "any data";

        let actual = QCMSelectors.getFetchAnswersStatus(globalStore);

        expect(actual).toEqual(expected);
    });

});