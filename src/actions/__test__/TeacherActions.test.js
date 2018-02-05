// @flow
import MockAdapter from 'axios-mock-adapter';
import apiInstance from "../../api/ApiHelper"
import * as TeacherActions from "../TeacherActions";
import type {Teacher} from "../../types/Teacher";


describe("TeacherActions.js", async () => {
    let mock = new MockAdapter(apiInstance);

    test('subscribeTeacher', () => {

        let returnedTeacher = {
            "id": 1,
            "name": "Dupont",
            "email": "dupont@random.com",
            "password": "1234"
        };

        mock.onPost('/teacher').reply(200, returnedTeacher);

        let teacher: Teacher = {
            id: 1,
            name: "Dupont",
            email: "dupont@random.com",
            password: "1234"
        };

        let actual = TeacherActions.subscribeTeacher(teacher);

        expect(actual.type).toEqual(TeacherActions.SUBSCRIBE_TEACHER);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedTeacher));
    });

    test('connectTeacher', () => {

        let returnedTeacher = {
            "id": 1,
            "email": "dupont@random.com",
        };

        mock.onPost('/connect/teacher').reply(200, returnedTeacher);

        let teacher: Teacher = {
            id: 1,
            email: "dupont@random.com",
        };

        let actual = TeacherActions.connectTeacher(teacher);

        expect(actual.type).toEqual(TeacherActions.CONNECT_TEACHER);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedTeacher));
    });
});