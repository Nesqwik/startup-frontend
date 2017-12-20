import * as WsHelper from "./WsHelper";
import type {WsPoints} from "../../types/WsPoints";
import * as StudentActions from "../../actions/StudentActions";
import store from "../../configs/Store";

/**
 * Permet d'écouter les modifications de points temps réel.
 * @param studentId
 */
export function listenPointChange(studentId: number) {
    WsHelper.subscribeToChannel(`/channel/notification/point/${studentId}`, (points: WsPoints) => {
        store.dispatch(StudentActions.addBonusRt(points))
    });
}