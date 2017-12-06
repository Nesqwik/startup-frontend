//@flow
import type {Classroom} from "../types/Classroom";
import ClassAPI from "../api/ClassAPI";

export const POST_CLASS = "POST_CLASS";
export const POST_CLASS_PENDING = POST_CLASS + "_PENDING";
export const POST_CLASS_FULFILLED = POST_CLASS + "_FULFILLED";
export const POST_CLASS_REJECTED = POST_CLASS + "_REJECTED";

/**
 * Action permettant de créer une classe.
 * Appel la requête de création de classe.
 * @param newClass la classe à créer
 *
 * type : génère les types POST_CLASS_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou la classe créée si réussi.
 * @returns {{type: string, payload: Promise}}
 */
export function postClass(newClass: Classroom) {
    return {
        type: POST_CLASS,
        payload: ClassAPI.postClass(newClass)
    }
}


export const FETCH_CLASSES = "FETCH_CLASSES";
export const FETCH_CLASSES_PENDING = FETCH_CLASSES + "_PENDING";
export const FETCH_CLASSES_FULFILLED = FETCH_CLASSES + "_FULFILLED";
export const FETCH_CLASSES_REJECTED = FETCH_CLASSES + "_REJECTED";

/**
 * Action permettant de récupérer la liste des classes.
 * Appel la requête de création de classe.
 *
 * type : génère les types POST_CLASS_[PENDING/REJECTED/FULFILLED] automatiquement à récupérer dans le reducer.
 * payload : Promise contenant erreur si rejected ou la classe créée si réussi.
 * @returns {{type: string, payload: Promise}}
 */
export function fetchClasses() {
    return {
        type: FETCH_CLASSES,
        payload: ClassAPI.getClasses()
    }
}