//@flow

import type {Teacher} from "../types/Teacher";
import TeacherAPI from "../api/TeacherAPI";
import type {Credentials} from "../types/Credentials";

export const SUBSCRIBE_TEACHER = "SUBSCRIBE_TEACHER";
export const SUBSCRIBE_TEACHER_PENDING = SUBSCRIBE_TEACHER + "_PENDING";
export const SUBSCRIBE_TEACHER_FULFILLED = SUBSCRIBE_TEACHER + "_FULFILLED";
export const SUBSCRIBE_TEACHER_REJECTED = SUBSCRIBE_TEACHER + "_REJECTED";
export const CONNECT_TEACHER = "CONNECT_TEACHER";
export const CONNECT_TEACHER_PENDING = CONNECT_TEACHER + "_PENDING";
export const CONNECT_TEACHER_FULFILLED = CONNECT_TEACHER + "_FULFILLED";
export const CONNECT_TEACHER_REJECTED = CONNECT_TEACHER + "_REJECTED";


/**
 * Action permettant d'inscrire un enseignant.
 * Appel la requête de l'inscription d'un enseignant.
 * @param teacher l'enseignant
 *
 * type : génère les types SUBSCRIBE_TEACHER_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou l'enseignant ajouté si réussi.
 * @returns {{type: string, payload: Promise}}
 */
export function subscribeTeacher(teacher: Teacher) {
    return {
        type: SUBSCRIBE_TEACHER,
        payload: TeacherAPI.subscribeTeacher(teacher)
    }
}

/**
 * Action permettant de connecter un enseignant.
 * Appel la requête de connexion d'un enseignant.
 * @param teacher l'enseignant
 *
 * type : génère les types CONNECT_TEACHER_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou l'enseignant ajouté si réussi.
 * @returns {{type: string, payload: Promise}}
 */
export function connectTeacher(credentials: Credentials) {
    return {
        type: CONNECT_TEACHER,
        payload: TeacherAPI.connectTeacher(credentials),
        meta: credentials
    }
}

