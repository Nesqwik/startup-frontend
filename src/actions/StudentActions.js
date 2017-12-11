//@flow

import StudentAPI from "../api/StudentAPI";
import type {Student} from "../types/Student";
import type {WsPoints} from "../types/WsPoints";

export const ADD_STUDENT = "ADD_STUDENT";
export const ADD_STUDENT_PENDING = ADD_STUDENT + "_PENDING";
export const ADD_STUDENT_FULFILLED = ADD_STUDENT + "_FULFILLED";
export const ADD_STUDENT_REJECTED = ADD_STUDENT + "_REJECTED";

export const GET_STUDENTS = "GET_STUDENTS";
export const GET_STUDENTS_PENDING = GET_STUDENTS + "_PENDING";
export const GET_STUDENTS_FULFILLED = GET_STUDENTS + "_FULFILLED";
export const GET_STUDENTS_REJECTED = GET_STUDENTS + "_REJECTED";

export const ADD_BONUS = "ADD_BONUS";
export const ADD_BONUS_PENDING = ADD_BONUS + "_PENDING";
export const ADD_BONUS_FULFILLED = ADD_BONUS + "_FULFILLED";
export const ADD_BONUS_REJECTED = ADD_BONUS + "_REJECTED";

export const ADD_MALUS = "ADD_MALUS";
export const ADD_MALUS_PENDING = ADD_MALUS + "_PENDING";
export const ADD_MALUS_FULFILLED = ADD_MALUS + "_FULFILLED";
export const ADD_MALUS_REJECTED = ADD_MALUS + "_REJECTED";

export const GET_POINTS = "GET_POINTS";
export const GET_POINTS_PENDING = GET_POINTS + "_PENDING";
export const GET_POINTS_FULFILLED = GET_POINTS + "_FULFILLED";
export const GET_POINTS_REJECTED = GET_POINTS + "_REJECTED";


/**
 * Action permettant d'ajouter un élève.
 * Appel la requête de l'ajout d'un élève.
 * @param student l'élève
 * @param classroom la classe
 *
 * type : génère les types ADD_STUDENT_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou l'élève ajouté si réussi.
 * @returns {{type: string, payload: Promise}}
 */
export function addStudent(student: Student) {
    return {
        type: ADD_STUDENT,
        payload: StudentAPI.addStudent(student)
    }
}

/**
 * Action permettant de récupérer la liste des élèves.
 * Appel la requête de la récupération des élèves.

 * type : génère les types GET_STUDENTS_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou la liste des élèves si réussi.
 * @returns {{type: string, payload: Promise}}
 */
export function getStudents() {

    return {
        type: GET_STUDENTS,
        payload: StudentAPI.getStudents()
    }
}

/**
 * Action permettant l'ajout d'un bonus à un élève.
 * Appel la requête de l'ajout d'un bonus à un élève.
 * @param studentId id de l'élève
 *
 * type : génère les types ADD_BONUS_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou le bonus ajouté à l'élève si réussi.
 * @returns {{type: string, payload: Promise}}
 */
export function addBonus(studentId: number) {
    return {
        type: ADD_BONUS,
        payload: StudentAPI.addBonus(studentId)
    }
}


export function addMalus(studentId: number) {
    return {
        type: ADD_BONUS,
        payload: StudentAPI.addMalus(studentId)
    }
}


export const WS_POINT_CHANGE = "WS_POINT_CHANGE";

export function addBonusRt(wsPoints: WsPoints) {

    return {
        type: WS_POINT_CHANGE,
        payload: wsPoints,
    }
}
