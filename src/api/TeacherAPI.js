import ApiInstance from "./ApiHelper";
import type {Teacher} from "../types/Teacher";
import type {Credentials} from "../types/Credentials";

/**
 * Requête POST sur /teacher avec teacher en body.
 * @param teacher
 * @returns {Promise<any>}
 *
 */
async function subscribeTeacher(teacher: Teacher) {
    return await ApiInstance.post("/teacher", teacher);
}

/**
 * Requête POST sur /connect/teacher avec teacher en body.
 * @param teacher
 * @returns {Promise<any>}
 *
 */
async function connectTeacher(credentials: Credentials) {
    return await ApiInstance.post("/connect/teacher", {}, {
        auth: {
            username: credentials.email,
            password: credentials.password
        }
    });
}


export default {
    subscribeTeacher: subscribeTeacher,
    connectTeacher: connectTeacher,
};