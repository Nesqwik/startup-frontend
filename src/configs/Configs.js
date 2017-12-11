/**
 * URL de base du serveur back.
 * Différent selon prod ou dev.
 */
let ENDPOINT;
if (process.env.NODE_ENV === 'production') {
    ENDPOINT = "http://149.202.179.212:8080/prod/";
} else {
    //ENDPOINT = "http://149.202.179.212:8080/dev/"
    //ENDPOINT = "http://localhost:8080/";
    ENDPOINT = "http://172.18.13.114:8080/";
}

/**
 * Objet contenant toutes les configs nécessaires.
 */
export default {
    ENDPOINT: ENDPOINT
}
