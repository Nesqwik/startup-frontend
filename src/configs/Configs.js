/**
 * URL de base du serveur back.
 * Différent selon prod ou dev.
 */
let ENDPOINT;
if (process.env.NODE_ENV === 'production') {
    ENDPOINT = "http://149.202.179.212:8080/dev/";
} else {
    ENDPOINT = "http://localhost:8080/";
}

/**
 * Objet contenant toutes les configs nécessaires.
 */
export default {
    ENDPOINT: ENDPOINT
}