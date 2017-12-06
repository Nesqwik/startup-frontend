// @flow
import * as ClassActions from "../ClassActions";
import type {Classroom} from "../../types/Classroom";
import MockAdapter from 'axios-mock-adapter';
import apiInstance from "../../api/ApiHelper"


describe("classActions.js", async () => {
    let mock = new MockAdapter(apiInstance);

    test('postClass', () => {

        let returnedClassroom = {
            "className": "classe de test",
            "id": 1
        };

        mock.onPost('/class').reply(200, returnedClassroom);

        let classroom: Classroom = {
            className: "test"
        };

        let actual = ClassActions.postClass(classroom);

        expect(actual.type).toEqual(ClassActions.POST_CLASS);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedClassroom));
    });

    test('fetchClasses', () => {

        let returnedClassroom: Array<Classroom> = [{
            "className": "classe de test",
            "id": 1
        }, {
            "className": "classe de test 2",
            "id": 2
        }, {
            "className": "classe de test 3",
            "id": 3
        }];

        mock.onGet('/class').reply(200, returnedClassroom);


        let actual = ClassActions.fetchClasses();

        expect(actual.type).toEqual(ClassActions.FETCH_CLASSES);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedClassroom));
    });
});