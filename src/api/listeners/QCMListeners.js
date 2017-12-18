import * as WsHelper from "./WsHelper";
import store from "../../configs/Store";
import type {WSAnswer} from "../../types/WSAnswer";
import * as QCMActions from "../../actions/QCMActions";

//TODO: commente Louis
export function listenNewAnswer(qcmId: number) {
    WsHelper.subscribeToChannel(`/channel/notification/result_qcm/${qcmId}`, (answer: WSAnswer) => {
        store.dispatch(QCMActions.wsNewAnswer(answer, qcmId))
    });
}