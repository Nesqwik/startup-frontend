//@flow

import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Configs from "../../configs/Configs";

/**
 * Boilerplate, permet de créer l'environnement temps réel.
 */

const socket = new SockJS(Configs.WS_ENDPOINT);
const stompClient = Stomp.over(socket);

let pendingSubscribtions: Array<Object> = [];
let isConnected = false;

let subscriptions = {};

stompClient.debug = function (str) {
};

stompClient.connect({}, () => {
    isConnected = true;
    subscribePendingList();
}, (err) => console.error("error:", err));

/**
 *
 */
function subscribePendingList() {
    pendingSubscribtions.forEach(({channelName, handler}) => {

        if(subscriptions[channelName]) {
            subscriptions[channelName].unsubscribe();
        }

        let sub = stompClient.subscribe(channelName, async (response) => {
            handler(JSON.parse(response.body));
        });

        subscriptions[channelName] = sub;
    });
    pendingSubscribtions = [];
}

/**
 * Permet de s'inscrire à un channel.
 * @param channelName Nom du channel
 * @param handler Fonction à appeler en cas de message dans le channel donné
 * @returns {{send: (function(string, Object))}}
 */
export function subscribeToChannel(channelName: string, handler: (Object) => void) {
    pendingSubscribtions.push({channelName, handler});
    if (isConnected) {
        subscribePendingList();
    }

    return {
        send: (channel: string, obj: Object) => {
            stompClient.send(channel, {}, JSON.stringify(obj));
        }
    }
}
