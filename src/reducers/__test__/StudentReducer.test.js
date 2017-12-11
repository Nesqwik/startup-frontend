import studentReducer from "../StudentReducer";
import * as StudentSelectors from "../StudentReducer";
import type {Student} from "../../types/Student";
import type {Points} from "../../types/Points";

describe("StudentReducer.js", () => {

    test("initialValue", () => {
        let expected = {
            students: {
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
            },
            updateStatus: {
                updating: false,
                updated: false,
                updateError: null,
            }
        };

        let actual = studentReducer(undefined, {
            type: "NONE"
        });

        expect(actual).toEqual(expected);
    });


    test("When Action ADD_STUDENT_PENDING", () => {
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

        let actual = studentReducer(initialValue, {
            type: "ADD_STUDENT_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action ADD_STUDENT_FULFILLED", () => {
        let initialValue = {
            postStatus: {
                posting: true,
                posted: false
            },
            students: {
                byId: {},
                allIds: []
            }
        };

        // Example of data returned by the API Call
        let student: Student = {
            id : 1,
            firstName : "Jean",
            lastName: "Bon",
            born: "2017-11-28T13:48:43.089Z",
            idClass : 1,
            bonus : 0,
            malus : 0
        };

        let expected = {
            postStatus: {
                posting: false,
                posted: true
            },
            students: {
                byId: {1: student},
                allIds: [1]
            }
        };

        let actual = studentReducer(initialValue, {
            type: "ADD_STUDENT_FULFILLED",
            payload: student
        });

        expect(actual).toEqual(expected);
    });

    test("When Action ADD_STUDENT_FULFILLED with no class id", () => {
        let initialValue = {
            postStatus: {
                posting: true,
                posted: false
            },
            students: {
                byId: {},
                allIds: []
            }
        };

        // Example of data returned by the API Call
        let student: Student = {
                firstName : "Jean",
                lastName: "Bon",
                born: "2017-11-28T13:48:43.089Z",
                idClass : 1,
                bonus : 0,
                malus : 0
        };

        let expected = initialValue;

        let actual = studentReducer(initialValue, {
            type: "ADD_STUDENT_FULFILLED",
            payload: student
        });

        expect(actual).toEqual(expected);
    });


    test("When Action ADD_STUDENT_REJECTED", () => {
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

        let actual = studentReducer(initialValue, {
            type: "ADD_STUDENT_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });


    test("When Action GET_STUDENTS_PENDING", () => {
        let initialValue = {
            fetchStatus: {
                fetching: false
            }
        };

        let expected = {
            fetchStatus: {
                fetching: true
            }
        };

        let actual = studentReducer(initialValue, {
            type: "GET_STUDENTS_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action GET_STUDENTS_FULFILLED", () => {
        let initialValue = {
            fetchStatus: {
                fetching: true,
                fetched: false
            },
            students: {
                byId: {},
                allIds: []
            }
        };


        // Example of data returned by the API Call
        let students: Student = [{
            id : 1,
            firstName : "Jean",
            lastName: "Bon",
            born: "2017-11-28T13:48:43.089Z",
            idClass : 1,
            bonus : 0,
            malus : 0
        },
            {
                id : 2,
                firstName : "Jeanne",
                lastName: "Bonita",
                born: "2017-11-28T13:48:43.089Z",
                idClass : 1,
                bonus : 0,
                malus : 0
            }];

        let expected = {
            fetchStatus: {
                fetching: false,
                fetched: true
            },
            students: {
                byId: {1 : students[0], 2: students[1]},
                allIds: [1, 2]
            }
        };

        let actual = studentReducer(initialValue, {
            type: "GET_STUDENTS_FULFILLED",
            payload: students
        });

        expect(actual).toEqual(expected);
    });


    test("When Action GET_STUDENTS_REJECTED", () => {
        let initialValue = {
            fetchStatus: {
                fetching: false,
                fetchError: null
            }
        };

        let expected = {
            fetchStatus: {
                fetching: false,
                fetchError: "Erreur"
            }
        };

        let actual = studentReducer(initialValue, {
            type: "GET_STUDENTS_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });


    test("When Action ADD_BONUS_PENDING", () => {
        let initialValue = {
            updateStatus: {
                updating: false
            }
        };

        let expected = {
            updateStatus: {
                updating: true
            }
        };

        let actual = studentReducer(initialValue, {
            type: "ADD_BONUS_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action ADD_BONUS_FULFILLED", () => {
        let initialValue = {
            updateStatus: {
                updating: true,
                updated: false
            },
            students: {
                byId: {
                    [1]: {
                        points: {
                            bonus: 1,
                            malus: 0,
                            idSudent: 1
                        }
                    }
                }
            }
        };

        // Example of data returned by the API Call
        let points: Points = {
            bonus : 2,
            malus : 0,
            idStudent: 1
        };

        let expected = {
            updateStatus: {
                updating: false,
                updated: true
            },
            students: {
                byId: {1: {
                    points: points
                }}
            }
        };

        let actual = studentReducer(initialValue, {
            type: "ADD_BONUS_FULFILLED",
            payload: points
        });

        expect(actual).toEqual(expected);
    });


    test("When Action ADD_BONUS_REJECTED", () => {
        let initialValue = {
            updateStatus: {
                updating: false,
                updateError: null
            }
        };

        let expected = {
            updateStatus: {
                updating: false,
                updateError: "Erreur"
            }
        };

        let actual = studentReducer(initialValue, {
            type: "ADD_BONUS_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });


    test("selector getPostStatus", () => {
        let globalStore = {
            studentState: {
                postStatus: "any data"
            }
        };

        let expected = "any data";

        let actual = StudentSelectors.getPostStatus(globalStore);

        expect(actual).toEqual(expected);
    });

    test("selector getFetchStatus", () => {
        let globalStore = {
            studentState: {
                fetchStatus: "any data"
            }
        };

        let expected = "any data";

        let actual = StudentSelectors.getFetchStatus(globalStore);

        expect(actual).toEqual(expected);
    });
});