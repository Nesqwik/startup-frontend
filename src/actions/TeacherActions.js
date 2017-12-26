//@flow

import type {Teacher} from "../types/Teacher";
import TeacherAPI from "../api/TeacherAPI";

export const SUBSCRIBE_TEACHER = "SUBSCRIBE_TEACHER";
export const SUBSCRIBE_TEACHER_PENDING = SUBSCRIBE_TEACHER + "_PENDING";
export const SUBSCRIBE_TEACHER_FULFILLED = SUBSCRIBE_TEACHER + "_FULFILLED";
export const SUBSCRIBE_TEACHER_REJECTED = SUBSCRIBE_TEACHER + "_REJECTED";


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

