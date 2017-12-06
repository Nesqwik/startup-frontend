/**
 * Created by louis on 01/11/17.
 */
import ApiInstance from "./ApiHelper";
import type {Classroom} from "../types/Classroom";

/**
 * Requête POST sur /class avec newClass en body.
 * @param newClass
 * @returns {Promise<any>}
 */
function postClass(newClass: Classroom) {
    return ApiInstance.post("/class", newClass);
}

function getClasses() {
    return ApiInstance.get("/class");
}

export default {
    postClass: postClass,
    getClasses: getClasses
};