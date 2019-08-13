import type {QCM} from "../../types/QCM";
import * as QCMActions from "../QCMActions";
import MockAdapter from 'axios-mock-adapter';
import apiInstance from "../../api/ApiHelper"


describe("QCMActions.js", async () => {
    let mock = new MockAdapter(apiInstance);

    test('postQCM', () => {

        let returnedQCM = {
            "id" : 5,
            "classroom": {
                "id": 3
            },
            "instruction": "instruction",
            "questions": [],
            "title": "title"

        };

        mock.onPost('/qcm').reply(200, returnedQCM);

        let qcm: QCM = {
            classroom: {
                id:3
            },
            instruction:"instruction",
            questions:[],
            title: "title",
        };

        let actual = QCMActions.postQCM(qcm);

        expect(actual.type).toEqual(QCMActions.POST_QCM);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedQCM));
    });

    test('fetchQCMs', () => {

        let returnedQCM = {
            "id" : 5,
            "classroom": {
                "id": 3
            },
            "instruction": "instruction",
            "questions": [],
            "title": "title"

        };
        mock.onGet('/qcm').reply(200, returnedQCM);


        let actual = QCMActions.fetchQCMs();

        expect(actual.type).toEqual(QCMActions.FETCH_QCM);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedQCM));
    });

    test('fetchAnswers', () => {

        let returnedAnswers = {
            "choice": "choice",
            "good": true,
        };
        mock.onGet('/resultQcm/1').reply(200, returnedAnswers);


        let actual = QCMActions.fetchAnswers(1);

        expect(actual.type).toEqual(QCMActions.FETCH_ANSWERS);
        expect(actual.payload).toBeInstanceOf(Promise);

        actual.payload.then((res) => expect(res).toEqual(returnedAnswers));
    });

    //TODO ws_new_answer Louis
});