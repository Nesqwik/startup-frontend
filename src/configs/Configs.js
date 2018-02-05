/**
 * URL de base du serveur back.
 * Différent selon prod ou dev.
 */
let ENDPOINT;
let WS_ENDPOINT;
if (process.env.NODE_ENV === 'production') {
    let base = "http://149.202.179.212:8080/prod/";
    ENDPOINT = base;
    WS_ENDPOINT = base + "ws/"
} else {
    let base = "http://149.202.179.212:8080/dev/";
    ENDPOINT = base;
    WS_ENDPOINT = base + "ws/"
}

/**
 * Objet contenant toutes les configs nécessaires.
 */
export default {
    ENDPOINT: ENDPOINT,
    WS_ENDPOINT: WS_ENDPOINT
}
