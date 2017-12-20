// @flow
import * as ClassActions from "../ClassActions";
import type {Classroom} from "../../types/Classroom";
import MockAdapter from 'axios-mock-adapter';
import apiInstance from "../../api/ApiHelper"
import * as StudentActions from "../StudentActions";


describe("studentActions.js", async () => {
    let mock = new MockAdapter(apiInstance);

    test('addStudent', () => {

        let returnedStudent = {
            "id" : 1,
            "firstName" : "Jean",
            "lastName": "Bon",
            "born": "2017-11-28T13:48:43.089Z",
            "idClass" : 1,
            "bonus" : 0,
            "malus" : 0
        };

        mock.onPost('/student').reply(200, returnedStudent);

        let student: Student = {
            id : 1,
            firstName : "Jean",
            lastName: "Bon",
            born: "2017-11-28T13:48:43.089Z",
            idClass : 1,
            bonus : 0,
            malus : 0
        };

        let actual = StudentActions.addStudent(student);

        expect(actual.type).toEqual(StudentActions.ADD_STUDENT);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedStudent));
    });

    test('getStudents', () => {

        let returnedStudent = {
            "id" : 1,
            "firstName" : "Jean",
            "lastName": "Bon",
            "born": "2017-11-28T13:48:43.089Z",
            "idClass" : 1,
            "bonus" : 0,
            "malus" : 0
        };

        mock.onGet('/student').reply(200, [returnedStudent]);

        let actual = StudentActions.getStudents();

        expect(actual.type).toEqual(StudentActions.GET_STUDENTS);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual([returnedStudent]));
    });

    test('addBonus', () => {

        let returnedPoints = {
            idStudent: 1,
            bonus: 1,
            malus: 1
        };

        mock.onPost('/points').reply(200, returnedPoints);

        let actual = StudentActions.addBonus(1);

        expect(actual.type).toEqual(StudentActions.ADD_BONUS);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedPoints));
    });
});