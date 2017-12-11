/**
 * Created by louis on 01/11/17.
 */
import ApiInstance from "./ApiHelper";
import type {Student} from "../types/Student";

/**
 * Requête POST sur /student avec student en body.
 * @param student
 * @returns {Promise<any>}
 *
 */
async function addStudent(student: Student) {
    return await ApiInstance.post("/student", student);
}

/**
 * Requête GET sur /student.
 * @returns {Promise<any>}
 */
async function getStudents() {
    return await ApiInstance.get("/student");
}

/**
 * Requête GET sur /points.
 * @param studentId
 * @returns {Promise<any>}
 */
async function getPoints(studentId: number) {
    return await ApiInstance.get("/points");
}


/**
 * Requête PUT sur /bonus avec student en body.
 * @param studentId
 * @returns {Promise<any>}
 */
async function addBonus(studentId: number) {
    return await ApiInstance.post("/points", {
        "bonus": 1,
        "idStudent": studentId,
        "malus": 0
    });
}

/**
 * Requête PUT sur /malus avec student en body.
 * @param studentId
 * @returns {Promise<any>}
 */
async function addMalus(studentId: number) {
    return await ApiInstance.post("/points", {
        "bonus": 0,
        "idStudent": studentId,
        "malus": 1
    });
}


export default {
    addStudent: addStudent,
    getStudents: getStudents,
    addBonus: addBonus,
    addMalus: addMalus,
    getPoints: getPoints
};