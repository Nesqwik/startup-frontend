import {createChannel} from "./index";
import * as ChatActions from "../actions/ChatActions";
import store from "../configs/Store";

let channel = createChannel({
    channelName: "/channel/public",
    onInsert: (message) => {
        store.dispatch(ChatActions.receiveMessage(message));
    },
    onUpdate: (message) => {
        store.dispatch(ChatActions.updateMessage(message));
    },
    onDelete: (message) => {
        store.dispatch(ChatActions.deleteMessage(message));
    }
});

let chatApi = {
    sendMessage: channel.send.bind(this, "/app/chat.sendMessage")
};

export default chatApi;