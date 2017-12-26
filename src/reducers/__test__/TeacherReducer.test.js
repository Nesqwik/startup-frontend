import teacherReducer from "../TeacherReducer";
import type {Student} from "../../types/Student";
import type {Teacher} from "../../types/Teacher";

describe("TeacherReducer.js", () => {

    test("initialValue", () => {
        let expected = {
            postStatusSubscription: {
                posting: false,
                posted: false,
                postError: null
            },
            postStatusConnection: {
                posting: false,
                posted: false,
                postError: null
            }
        };

        let actual = teacherReducer(undefined, {
            type: "NONE"
        });

        expect(actual).toEqual(expected);
    });


    test("When Action SUBSCRIBE_TEACHER_PENDING", () => {
        let initialValue = {
            postStatusSubscription: {
                posting: false
            }
        };

        let expected = {
            postStatusSubscription: {
                posting: true
            }
        };

        let actual = teacherReducer(initialValue, {
            type: "SUBSCRIBE_TEACHER_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action SUBSCRIBE_TEACHER_FULFILLED", () => {
        let initialValue = {
            postStatusSubscription: {
                posting: true,
                posted: false
            }
        };

        // Example of data returned by the API Call
        let teacher: Teacher = {
            id: 1,
            name: "Dupont",
            email: "oui@gmail.com",
            password: "1234",
        };

        let expected = {
            postStatusSubscription: {
                posting: false,
                posted: true
            }
        };

        let actual = teacherReducer(initialValue, {
            type: "SUBSCRIBE_TEACHER_FULFILLED",
            payload: teacher
        });

        expect(actual).toEqual(expected);
    });

    test("When Action SUBSCRIBE_TEACHER_REJECTED", () => {
        let initialValue = {
            postStatusSubscription: {
                posting: false,
                postError: null
            }
        };

        let expected = {
            postStatusSubscription: {
                posting: false,
                postError: "Erreur"
            }
        };

        let actual = teacherReducer(initialValue, {
            type: "SUBSCRIBE_TEACHER_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action CONNECT_TEACHER_PENDING", () => {
        let initialValue = {
            postStatusConnection: {
                posting: false
            }
        };

        let expected = {
            postStatusConnection: {
                posting: true
            }
        };

        let actual = teacherReducer(initialValue, {
            type: "CONNECT_TEACHER_PENDING"
        });

        expect(actual).toEqual(expected);
    });

    test("When Action CONNECT_TEACHER_FULFILLED", () => {
        let initialValue = {
            postStatusConnection: {
                posting: true,
                posted: false
            }
        };

        // Example of data returned by the API Call
        let teacher: Teacher = {
            id: 1,
            email: "oui@gmail.com",
        };

        let expected = {
            postStatusConnection: {
                posting: false,
                posted: true
            }
        };

        let actual = teacherReducer(initialValue, {
            type: "CONNECT_TEACHER_FULFILLED",
            payload: teacher
        });

        expect(actual).toEqual(expected);
    });

    test("When Action CONNECT_TEACHER_REJECTED", () => {
        let initialValue = {
            postStatusConnection: {
                posting: false,
                postError: null
            }
        };

        let expected = {
            postStatusConnection: {
                posting: false,
                postError: "Erreur"
            }
        };

        let actual = teacherReducer(initialValue, {
            type: "CONNECT_TEACHER_REJECTED",
            payload: "Erreur"
        });

        expect(actual).toEqual(expected);
    });

});