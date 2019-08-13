/**
 * Created by louis on 01/11/17.
 */
import ApiInstance from "./ApiHelper";
import type {QCM} from "../types/QCM";

/**
 * Requête POST sur /qcm avec qcm en body.
 * @param qcm
 * @returns {Promise<any>}
 */
async function postQCM(qcm: QCM) {
    return await ApiInstance.post("/qcm", qcm);
}

/**
 * Requête GET sur /qcm/classroom avec qcm en body.
 * @param idClass
 * @returns {Promise<any>}
 */
function fetchQCMPerClass(idClass: number) {
    return ApiInstance.get("/qcm/classroom"+ idClass);
}
/**
 * Requête GET sur /qcm .
 * @returns {Promise<any>}
 */
function fetchQCMs() {
    return ApiInstance.get("/qcm");
}

/**
 * Requête GET sur /resultQcm/${qcmId}.
 * @param qcmId l'id du QCM
 * @returns {Promise<any>}
 */
function fetchAnswers(qcmId: number) {
    return ApiInstance.get(`/resultQcm/${qcmId}`);
}


export default {
    postQCM: postQCM,
    fetchQCMPerClass: fetchQCMPerClass,
    fetchQCMs: fetchQCMs,
    fetchAnswers: fetchAnswers
};