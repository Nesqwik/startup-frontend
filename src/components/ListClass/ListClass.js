// @flow
import React from "react";
import type {Classroom} from "../../types/Classroom";

import {List} from "material-ui/List";

import ClassItem from "./ClassItem";
import * as ReducerUtils from "../../reducers/ReducerUtils";

/**
 * Propriétés :
 * classes : la liste des Classroom à afficher
 * fetchClasses : la fonction à appelet pour récupérer les classes
 * fetchStatus : état de la requête de récupération des classes.
 */
type Props = {
    classes: Array<Classroom>,
    fetchClasses: () => Promise<any>,
    fetchStatus: ReducerUtils.FetchStatus
}

type State = {}

/**
 * Affiche la liste des classes.
 */
class ListClass extends React.Component<Props, State> {

    /**
     * Réupère la liste des classes lors de la construction du composant.
     * @param props
     */
    constructor(props: Props) {
        super(props);
        this.props.fetchClasses();
    }

    /**
     * Affiche la lsite des classes (renvoie un tableau de ClassItem)
     * @returns {Array}
     */
    renderClasses() {
        return this.props.classes.map((classroom: Classroom) => <ClassItem key={classroom.id} classroom={classroom} />);
    }

    render() {
        return (
            <List>
                {this.renderClasses()}
            </List>
        )
    }
}

export default ListClass;
