[![Build Status](https://travis-ci.org/Nesqwik/startup-frontend.svg?branch=master)](https://travis-ci.org/Nesqwik/startup-frontend)

Ce projet est réalisé avec [Create React App](https://github.com/facebookincubator/create-react-app).

## Sommaire

- [Outils utilisés](#outils-utilisés)
- [Architecture générale du projet](#architecture-générale-du-projet)
  - [Les composants (components)](#les-composants-components)
  - [Containers](#containers)
  - [Actions](#actions)
  - [Api](#api)
  - [Reducers](#reducers)


## Outils utilisés
Ce projet utilise les technologies [React](https://reactjs.org/) et [Redux](https://redux.js.org/).

Pour gérer les routes (pages), react-router@3.0.5 et react-router-redux@4.0.8 sont utilisés.

Afin de faciliter le développement de l'UI, [material-ui](http://www.material-ui.com) est utilisé. 
De même, les formulaires sont gérés à l'aide de [redux-form](https://redux-form.com/) afin de les lier à redux et de gérer la validation facilement.

Le typage statique est ajouté à l'aide de [flow](https://flow.org/)

[Todo] explications sur les websocket


## Architecture générale du projet

- **features** - contient les features et step definitions de cucumber
- **node_modules** - contient les dépendances du projet - ne pas modifier directement
- **public** - contient certains fichiers statics (index.html) - ne pas modifier
- **src** - contient les sources du projet
    * **actions** - contient les fonctions permettant de créer les actions à dispatcher
    * **api** - contient l'API permettant d'accèder au back-end (requêtes HTTP)
    * **components** - contient tous les composants du projet
    * **configs** - contient les fichiers de configuration (middlewares, thème, config du store...)
    * **containers** - contient tous les containers du projet
    * **pages** - contient les composant représentant des pages du menu
    * **reducers** - contient les reducers (un reducer par "thème" de donnée)
    * **types** - contient les types (bean) des objets utilisés
    * **utils** - contient des fichiers utilitaires (regex de test formulaires par exemple)


![Architecture du projet](https://img4.hostingpics.net/pics/458281Archifront.png "Architecture du projet")


### Les composants (components)

Les composants permettent de générer le html à afficher selon les paramètres internes.
Le HTML affiché est celui renvoyé par la fonction "render" du composant.


``` jsx
// @flow - permet de spécifier à flow que le typage est activé sur ce fichier.

// On importe react et toutes les dépendances (autres composants, utilitaires...)
import React, {Component} from "react";
import CreateClassForm from "./CreateClassForm";
import Dialog from "material-ui/Dialog";
import * as ReducerUtils from "../../reducers/ReducerUtils";
import type {Classroom} from "../../types/Classroom";
import AddButton from "../Common/AddButton";

// On défini le typage des propriétés du composant.
// Les propriétés sont les "attributs" passés lors de l'instanciation du composant. Par exemple : 
// <CreateClass postStatus={/* variable du status*/} onPostClass={(attr) => {console.log(attr)}}
type Props = {
    postStatus: ReducerUtils.PostStatus,
    onPostClass: (Classroom) => Promise<Classroom>
};

// On défini le typage de l'état du composant.
// L'état du composant permet de le manipuler en interne. 
// Par exemple, le boolean "open" permet de gérer l'affichage ou non du dialog contenant le formulaire.
// Pour modifier un état, il faut utiliser la fonction this.setState({variableAModifier: nouvelleValeur});
// Cela permet de mofifier l'état du composant tout en actualisant l'affichage du composant.
type State = {
    open: boolean,
    serverErrors: Array<string>
}

// On défini le composant (extends Component) et on le type <Props, State>
class CreateClass extends Component<Props, State> {

    // on défini l'état initial du composant
    state = {
        open: false,
        serverErrors: []
    };
    
    handleOpen() {
        this.setState({open: true});
    };

    handleClose() {
        this.setState({open: false});
    };

    onSubmit(form: Object) {
        let classroom: Classroom = {
            className: form.className
        };

        this.props.onPostClass(classroom).then(() => {
            this.handleClose();
        }, (errors) => {
            this.setState({
                serverErrors: errors
            });
        });
    }

    // La fonction render est appelé par React pour récupérer l'affichage du composant (le html).
    // Cette fonction est appelée à chaque fois qu'une variable du state ou des props est modifiée.
    // Les fonctions "render" des composants instanciés à l'interieur de cette fonction sont appelés. (provoque un render recursive)
    // Ici, les fonctions des composants "AddButton", "Dialog" sont appelés aussi. 
    render() {
        return (
            <div>
                <AddButton onClick={this.handleOpen.bind(this)}/>
                <Dialog
                    title="Créer une classe"
                    modal={true}
                    open={this.state.open}
                    className="dialog-title"
                >
                    <CreateClassForm onSubmit={this.onSubmit.bind(this)} onCancel={this.handleClose.bind(this)}/>
                    {this.state.serverErrors.map(error => <p>{error}</p>)}
                </Dialog>
            </div>
        );
    }
}

export default CreateClass;

```

### Containers
Les containers sont des composant qui par convention servent uniquement à "mapper" les 
propriétés d'un composant avec les données du store ou les actions.

Les données du store sont récupérés par les "Selecteurs" dans le reducer. Ces selecteurs sont des fonctions ayant pour
role de récupérer la partie nécessaire dans le store. Cela permet d'abstraire l'organisation du store pour les containers. 

Les actions servent de callback à donner aux composants pour réagir à une action de l'utilisateur sur l'interface.
Ces actions peuvent par exemple effectuer un appel REST au backend et modifier le store avec le résultat de la requête.

```jsx
// @flow 

// On importe les actions, selecteurs
import {connect} from 'react-redux';
import CreateClass from "../../components/CreateClass/CreateClass"

// Un import de cette forme permet de récupérer toutes les fonctions présentent dans le fichier ClassReducer.js
// et de les stocker dans un objet appelé ClassSelectors.
import * as ClassSelectors from "../../reducers/ClassReducer";
import * as ClassActions from "../../actions/ClassActions";

// Cette fonction permet de mapper les données dans le state (store) avec les propriétés du composant.
const mapStateToProps = (store: Object) => { // Le store global est récupéré en paramètre
    return {
        // On utilise un selecteur pour récupérer uniquement le PostStatus (représente l'état de la requête POST)
        postStatus: ClassSelectors.getPostStatus(store) 
    };
};

// Cette fonction permet de mapper les actions à envoyer au reducer avec les propriétés du composant.
const mapDispatchToProps = {
    // Ici, lors de l'appel de this.props.onPostClass dans CreateClass, l'action postClass sera envoyé au reducer.
    onPostClass: ClassActions.postClass
};

// Applique les mapping sur le composant CreateClass
export default connect(mapStateToProps, mapDispatchToProps)(CreateClass)

```

### Actions
Les actions sont les points d'entrées pour la modification du store.
Toutes les modifications du store se font depuis les actions envoyés au reducer. 
Le reducer va ensuite réagir aux actions pour modifier le store.

Avant d'arriver au Store, il est possible de définir des "middlewares" qui auront pour rôle de
modifier une action avant son arrivée aux reducers. Dans ce projet, un middleware est utilisé pour
transformer les actions envoyant une requête en 2 actions afin de suivre l'évolution de la requête.

Une action est un objet qui contient un attribut string "type". Par exemple : 
```jsx 
let action = {
    type: "UNE_ACTION"
};
```

Afin d'éviter de créer des actions à la volée à chaque fois que l'on en a besoin 
(au risque de faire une typo, une erreur dans les paramètres...), on va créer des
fonctions qui auront le rôle de créer les actions.

Par exemple : 
```jsx
export const POST_CLASS = "POST_CLASS";
export const POST_CLASS_PENDING = POST_CLASS + "_PENDING";
export const POST_CLASS_FULFILLED = POST_CLASS + "_FULFILLED";
export const POST_CLASS_REJECTED = POST_CLASS + "_REJECTED";

export function postClass(newClass: Classroom) {
    return {
        type: POST_CLASS,
        payload: ClassAPI.postClass(newClass)
    }
}
```

Dans cet exemple, l'action de type POST_CLASS est créée et renvoyée. Cette action a un autre attribut
"payload" qui a comme valeur la "promise" retournée par l'appel HTTP vers le backend. Cette action va donc
etre interceptée par un middleware afin de la découper automatiquement en 2 actions.

 * Une première action "POST_CLASS_PENDING" indiquant que la requête a été envoyée.
 * Une seconde action selon le retour de la requête :
   * "POST_CLASS_FULFILLED" indiquant que la requête a réussi. L'attribut "payload" a comme valeur le retour de l'appel HTTP.
   * "POST_CLASS_REJECTED" indiquant que la requête a ratée. L'attribut "payload" a comme valeur le retour de l'appel HTTP (une erreur).


### Api

Les API sont les fichiers contenant les fonction permettant d'appeler le back-end.

Par exemple :
```jsx
import ApiInstance from "./ApiHelper";
import type {Classroom} from "../types/Classroom";

function postClass(newClass: Classroom) {
    // Permet d'envoyer une requête POST à l'url baseUrl + "/class" avec le body newClass
    return ApiInstance.post("/class", newClass);
}

export default {
    postClass: postClass
};
```
Ici, l'import "ApiInstance" est une surcouche à notre lib HTTP axios. Cette surcouche s'occupe de définir les
headers nécessaire (Authorization, Content-Type, baseUrl...).

### Reducers

Les reducers sont les fonctions ayant pour but de réagir aux actions et de modifier le store.

Le store est en fait un gros objet (key:value). Chaque reducer va permettre de traiter un sous élément du store.

Pour qu'un reducer reçoive les actions, il faut l'ajouter dans le fichier reducers/index.js :

```jsx
import {combineReducers} from "redux";
import {reducer as formReducer} from "redux-form";
import {routerReducer} from 'react-router-redux'
import classReducer from "./ClassReducer"

const reducers = combineReducers({
    form: formReducer,
    routing: routerReducer,
    classState: classReducer,
    // ...
});


```

La fonction de la lib redux "combineReducers" permet de combiner les reducers pour que chaqu'un s'occupe d'un sous state du store.

Ici, il y a 3 reducers pour 3 sous ensemble : 
 * le sous ensemble form est traité par le reducer formReducer (lib redux-form)
 * le sous ensemble routing est traité par le reducer routerReducer (lib react-router-redux)
 * le sous ensemble classState est traité par le reducer classReducer (reducers/ClassReducer)

Chaque nouveau reducer devra être ajouté dans ce ficher sur une nouvelle ligne.

Détails du reducer classReducer.js : 
```jsx
// @flow
import * as ClassActions from "../actions/ClassActions";
import type {Classroom} from "../types/Classroom";
import * as ReducerUtils from "./ReducerUtils";
import update from "immutability-helper";


// Pour commencer, on va décrire le type de notre State
type State = {
    classes: {
        byId: { [number]: Classroom },
        allIds: Array<number>
    },
    postStatus: ReducerUtils.PostStatus
}

// Ensuite, on va donner une valeur par défault du state (correspondant avec le type)
const initialState: State = {
    classes: {
        byId: {},
        allIds: []
    },
    // L'utilitaire ReducerUtils.createPostStatus va nous créer un objet de type PostStatus, soit : 
    // {
    //      posting: false,
    //      posted: false,
    //      postError: null
    // }
    postStatus: ReducerUtils.createPostStatus()
};

// Le reducer est une fonction qui va prendre en paramètres le state et une action.
// Il va devoir renvoyer une COPIE du state modifié (de façon immutable).
// Pour nous aider à réaliser cette copie en profondeur, l'utilitaire "update" est très efficace.
// "update" va prendre en paramètre l'objet à modifier (ici le state) et une description de la modification à effectuer.
// Il va nous renvoyer une copie modifiée du state.
const reducer = (state: State = initialState, action: ReducerUtils.Action) => {
    switch (action.type) {
    
        // Ici on va traiter l'action "POST_CLASS_PENDING" correspondant à un appel à la requête POST /class
        case ClassActions.POST_CLASS_PENDING:
            // ici, on va demander à update de modifier l'objet PostStatus
            // ReducerUtils.updatePosting nous permet de modifier l'objet postStatus pour suivre l'état de la requête.
            // nouvelle valeur de postStatus: 
            // {
            //      posting: true,
            //      posted: false,
            //      postError: null
            // } 
            return update(state, {
                postStatus: {
                    $set: ReducerUtils.updatePosting(state.postStatus)
                }
            });


        // Ici on va traiter l'action "POST_CLASS_FULFILLED" correspondant à un retour succès de la requête POST /class
        // l'action va avoir un paramètre payload égale à la valeur du body de la réponse. (ici la classe créée)
        case ClassActions.POST_CLASS_FULFILLED:
            // On récupère la classe créée.
            let classroom: Classroom = action.payload;

            // On vérifie que l'id de la classe est bien existant.
            if (classroom.id === undefined) return state;
            let classroomId: number = classroom.id;

            // On ajoute la nouvelle classe en modifiant encore l'état de la requête.
            return update(state, {
                postStatus: {
                    $set: ReducerUtils.updatePosted(state.postStatus),
                },
                classes: {
                    byId: {
                        [classroomId]: {
                            $set: classroom
                        }
                    },
                    allIds: {
                        $push: [classroomId]
                    }
                }
            });

        // Même chose en cas d'erreur de la requête. Ici, action.payload vaut l'erreur.
        case ClassActions.POST_CLASS_REJECTED:
            return update(state, {
                postStatus: {
                    $set: ReducerUtils.updatePostError(state.postStatus, action.payload)
                }
            });

        default:
            return state
    }
};

export default reducer;
```

**Remarque** : Les classes sont stockés d'une façon un peu particulière : 
```jsx
classes: {
    byId: {[number]: Classroom},
    allIds: Array<number>
}
```
Cette organisation stock les id des classes dans le tableau allIds et une map classId => classroom pour stocket les objets Classroom.
Cela offre l'avantage de pouvoir récupérer très facilement une classe à partir de son Id. ou de récupérer l'ensebme des classes très facilement.

L'inconvénient est qu'il est nécessaire de mettre à jour l'information à deux endroit en cas d'ajout ou de supression de classe.


Dans ce même fichier, il est possible de définir des "selectors", fonction permettant de récupérer un morceau du store.

```jsx
/*************/
/* SELECTORS */
/*************/

// puisqu'on récupère le store global, on va définir une fonction permettant de récupérer le 
// sous état géré par ce reducer. Ici, classState.
const getState = (store: Object) => {
    return store.classState;
};

// getClasses permet de renvoyer la liste des classes.
// Pour cela, on récupère le tableau des id de classes (classes.allIds) et on map dessus pour aller chercher
// les objets "Classroom" dans la map classes.byId. 
export const getClasses = (store: Object) => {
    let state = getState(store);
    return state.classes.allIds.map(id => state.classes.byId[id]);
};

// Ici, on récupère simplement l'état de la requête POST.
export const getPostStatus = (store: Object) => {
    let state = getState(store);
    return state.postStatus;
};
```
L'avantage de mettre les selecteurs dans le même fichier que le reducer est qu'il est plus simple de spécifier l'accès aux
données au même endroit que la définition de l'organisation de ces mêmes données dans le store.
De ce fait, si l'organisation des donnée est modifier, il n'est pas nécessaire d'aller modifier tous les containers utilisant 
ces données. Il suffit de modifier ces fonctions. 
