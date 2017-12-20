// @flow
import React from 'react'
import type {Student} from "../../types/Student";
import type {Classroom} from "../../types/Classroom";
import classroomImage from "./classroom.png"
import qrcodeIcon from "./qrcode.png"
import Plus from "material-ui/svg-icons/content/add-circle"
import Minus from "material-ui/svg-icons/content/remove-circle"
import {
    Card,
    CardText,
    CircularProgress,
    FlatButton,
    IconButton,
    RaisedButton,
    Tab,
    Table,
    TableBody,
    TableRow,
    TableRowColumn,
    Tabs,
    Toolbar,
    ToolbarGroup
} from "material-ui";
import type * as ReducerUtils from "../../reducers/ReducerUtils";
import BackCover from "../BackCover/BackCover";
import AddStudent from "../AddStudent/AddStudent";
import * as StudentListeners from "../../api/listeners/StudentListeners";
import CreateQCMContainer from "../../containers/CreateQCM/CreateQCMContainer";
import ListQCMContainer from "../../containers/ListQCM/ListQCMContainer";
import Icon from "../Common/Icon";
import * as QRCode from "qrcode";

type Props = {
    students: Array<Student>,
    classroom: ?Classroom,
    fetchStatusClass: ReducerUtils.FetchStatus,
    fetchStatusStudent: ReducerUtils.FetchStatus,
    fetchClasses: ()=>Promise<any>,
    fetchStudents: ()=>Promise<any>,
    postStatus: ReducerUtils.PostStatus,
    onAddStudent: (Student) => Promise<Student>,
    onAddBonus: (number) => Promise<any>,
    onAddMalus: (number) => Promise<any>,

}

type State = {
    serverErrors: Array<string>,
}


/**
 * Composant permettant d'afficher les informations d'une classe.
 *
 * propriétés :
 *  students: Tableau contenant tous les élèves de la classe
 *  classroom: Classe affichée
 *  fetchClasses : la fonction à appeler pour récupérer les classes
 *  fetchStudents: la fonction à appeler pour récupérer les élève
 *  fetchStatusClass : status de la fonction fetchClasse
 *  fetchStatusStudent: status de la fonction fetchStudents
 *  fetchStatus : état de la requête de récupération des classes.
 *  onAddStudent: fonction callback à appeler pour ajouter un élève.
 *  onAddBonus: fonction callback à appeler pour ajouter un bonus à un élève
 *  onAddMalus: fonction callback à appeler pour ajouter un malus à un élève
 */
class ClassroomDisplay extends React.Component<Props, State> {


    state = {
        serverErrors: [],
    };

    /**
     * Constructeur de ClassroomDisplay
     * @param props les propriétés de la classe
     */
    constructor(props: Object){
        super(props);
        if(!this.props.fetchStatusClass.fetched) this.props.fetchClasses();
        if(!this.props.fetchStatusStudent.fetched) this.props.fetchStudents();
    }


    componentWillReceiveProps(nextProps: Props) {
        if(this.props.students.length !== nextProps.students.length) {
            nextProps.students.forEach((student: Student) => {
                StudentListeners.listenPointChange(student.id);
            });
        }
    }


    /**
     * Fonction appelée pour ajouter un point Bonus
     * @param studentId est l'élève qui a un point bonus ajouté.
     */
    handleAddBonus(studentId: number){
        this.props.onAddBonus(studentId).then(() => {},(errors) => {
            this.setState({
                serverErrors: errors
            });
        });
    }

    /**
     * Fonction appelée pour ajouter un point Malus
     * @param studentId est l'élève qui a un point malus ajouté.
     */
    handleAddMalus(studentId: number){

        this.props.onAddMalus(studentId).then(() => {},(errors) => {
            this.setState({
                serverErrors: errors
            });
        });
    }

    /**

     *
     * Fonction appelée pour ouvrir une nouvelle fenêtre contenant le code QR
     * @param student est l'élève donc le QR code est affiché
     */
    handleShowQRCode(student: Student){
        QRCode.toCanvas(student.uuid, function (err, canvas) {
            if (err) throw err;
            let qrWindow = window.open("","QRCode");
            qrWindow.document.body.innerHTML =
                "<body>" +
                "<table>" +
                "<tr>" +
                "<td>" +
                "<input type=\"button\" value='Imprimer' onclick='print()'/>" +
                "</td>" +
                "</tr>" +
                "<tr>" +
                "<td>" + student.firstName + " " + student.lastName + "</td>" +
                "</tr>" +
                "<tr>" +
                "<td><div id='qrContainer'></div></td>" +
                "</tr>" +
                "</table>" +
                "</body>";
            let container = qrWindow.document.getElementById('qrContainer')
            container.appendChild(canvas)

        });
    }

    /**
     *
     * Fonction appelée pour ouvrir une nouvelle fenêtre contenant le code QR
     * @param students est le tableau contenant tous les élèves donc le QR code est affiché
     */
    handleShowAllQRCodes(students: Array<Student>){
        let qrWindow = window.open("","QRCode");
        let res = "<body><table><tr><input type=\"button\" value='Imprimer' onclick='print()'/></tr>";
        students.forEach((student) =>
                res +=
                    "<tr>" +
                    "<td>" + student.firstName + " " + student.lastName + "</td>" +
                    `<td><div id="qrContainer${student.id}"></div></td>` +
                    "</tr>"
        );
        qrWindow.document.body.innerHTML= res;

        students.forEach((student) =>
            QRCode.toCanvas(student.uuid, function (err, canvas) {
                if (err) throw err;
                let container = qrWindow.document.getElementById(`qrContainer${student.id}`);
                container.appendChild(canvas)

    }));}

    /**
     * Produit la liste des élèves d'une classe
     * @returns {Array}
     */
    renderClass() {
        return this.props.students.filter((student)=> student.classroom.id === this.props.classroom.id).map((student: Student) =>
            <TableRow selectable={false} key={student.id}>
                <TableRowColumn>{student.firstName}</TableRowColumn>
                <TableRowColumn>{student.lastName}</TableRowColumn>
                <TableRowColumn>
                    <FlatButton
                        style={{color:'#008000'}}
                        label={student.points.bonus + ""}
                        labelPosition="before"
                        icon={<Plus/>}
                        onClick={this.handleAddBonus.bind(this, student.id)}
                    />
                </TableRowColumn>
                <TableRowColumn>
                    <FlatButton
                        style={{color:'#FF0000'}}
                        label={student.points.malus  + ""}
                        labelPosition="before"
                        icon={<Minus/>}
                        onClick={this.handleAddMalus.bind(this, student.id)}
                    />
                </TableRowColumn>
                <TableRowColumn>{student.points.bonus - student.points.malus}</TableRowColumn>
                <TableRowColumn>
                    <IconButton onClick={this.handleShowQRCode.bind(this, student)}>
                        <Icon icon={qrcodeIcon}/>
                    </IconButton>
                </TableRowColumn>
            </TableRow>
        );
    }

    render() {

        if(this.props.fetchStatusClass.fetching || this.props.fetchStatusStudent.fetching){

            return <CircularProgress size={60} thickness={7} style={{margin: "auto", display: "block", marginTop: "20px"}}/>
        }
        if(!this.props.classroom){

            return <div> Aucune Classe trouvée avec cet identifiant </div>
        }
        return (
            <Card>
                <BackCover
                    title={this.props.classroom.className}
                    image={classroomImage}/>
                <Tabs tabItemContainerStyle={{backgroundColor:"#720000"}}>
                    <Tab label="Élèves">
                        <Toolbar>
                            <ToolbarGroup>
                                <RaisedButton label="Imprimer tous les QRCodes" primary={true} disabled={this.props.students.length === 0} onClick={this.handleShowAllQRCodes.bind(this, this.props.students)}/>
                            </ToolbarGroup>
                        </Toolbar>

                        <AddStudent classroom={this.props.classroom}
                                    postStatus={this.props.postStatus}
                                    onAddStudent={this.props.onAddStudent}/>
                        <CardText>
                            <Table>
                                <TableBody displayRowCheckbox={false}>
                                    {this.renderClass()}
                                </TableBody>
                            </Table>
                        </CardText>
                    </Tab>
                    <Tab label="QCM">
                        <CreateQCMContainer classId={this.props.classroom.id}/>
                        <ListQCMContainer idClass={+this.props.classroom.id}/>
                    </Tab>
                </Tabs>
            </Card>
        )
    }
}

export default ClassroomDisplay;
