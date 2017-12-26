import ApiInstance from "./ApiHelper";
import type {Teacher} from "../types/Teacher";

/**
 * Requête POST sur /teacher avec teacher en body.
 * @param teacher
 * @returns {Promise<any>}
 *
 */
async function subscribeTeacher(teacher: Teacher) {
    return await ApiInstance.post("/teacher", teacher);
}



export default {
    subscribeTeacher: subscribeTeacher,
};