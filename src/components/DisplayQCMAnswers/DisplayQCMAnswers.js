// @flow
import React from 'react'
import type {QCM} from "../../types/QCM";
import type {Student} from "../../types/Student";
import type {StudentAnswers} from "../../types/StudentAnswer";
import type {Question} from "../../types/Question";
import type {Answer} from "../../types/Answer";
import {listenNewAnswer} from "../../api/listeners/QCMListeners";
import {Subheader, Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from "material-ui";


type Props = {
    qcmId: number,
    qcm: ?QCM,
    students: Array<Student>,
    answerMap: { [number]: StudentAnswers },
    fetchStudents: () => Promise<any>,
    fetchQCMs: () => Promise<any>,
    fetchAnswers: (number) => Promise<any>
}

type State = {}

/**
 * Composant permettant d'afficher les résultats du QCM des élèves.
 *
 * propriétés :
 *  qcmId: id du qcm
 *  qcm: qcm actif
 *  students: élèves de la classe
 *  answerMap: //TODO Louis le commentaire
 *  fetchStudents: effectue la récupération des élèves
 *  fetchQCMs: effectue la récupération des QCMs
 *  fetchAnswers: effectue la récupération des réponses
 */
class DisplayQCMAnswers extends React.Component<Props, State> {

    state = {};

    /**
     * Constructeur de la classe
     * @param props
     */
    constructor(props: Props) {
        super(props);
        this.props.fetchStudents();
        this.props.fetchQCMs();
        this.props.fetchAnswers(this.props.qcmId)
    }

    /**
     * //TODO Louiiiiiiiis
     * @param newProps
     */
    componentWillReceiveProps(newProps: Props) {
        if (newProps.qcm) {
            listenNewAnswer(newProps.qcm.id);
        }
    }

    /**
     * Assigne une couleur rouge ou verte ou blanche en fonction de si l'élève a faux, vrai ou n'a pas encore répondu
     * @param student l'élève
     * @param studentAnswersMap //TODO Louis
     * @param answers les réponses
     * @returns {string}
     */
    getColor(student: Student, studentAnswersMap: { [number]: StudentAnswers }, answers: Array<Answer>) {
        let hasGood = false;
        let isFalse = false;
        answers.forEach((answer: Answer) => {
            if (studentAnswersMap[answer.id] && studentAnswersMap[answer.id].studentIds.some(id => id === student.id)) {
                if (answer.good) {
                    hasGood = true;
                } else {
                    isFalse = true;
                }
            }
        });

        if (isFalse) return "red";
        if (hasGood) return "green";
        return "white"
    }

    /**
     * Affiche la case colorée correspondant à la réponse de l'élève
     * @param student l'élève
     * @param studentAnswersMap //TODO louis
     * @param answers les réponses
     * @returns {*}
     */
    renderStudentAnswer(student: Student, studentAnswersMap: { [number]: StudentAnswers }, answers: Array<Answer>) {
        let color = this.getColor(student, studentAnswersMap, answers);

        return (
            <TableRowColumn>
                <div style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: color
                }}></div>
            </TableRowColumn>
        )
    }

    /**
     * Affiche la ligne de question
     * @param students la liste des élèves (pour le nombre de case)
     * @param question la question
     * @returns {*}
     */
    renderQuestion(students: Array<Student>, question: Question) {
        return (
            <TableRow>
                <TableRowColumn>{question.query}</TableRowColumn>
                {students.map(student => this.renderStudentAnswer(student, this.props.answerMap, question.answers))}
            </TableRow>
        )
    }

    /**
     * Affiche le QCM
     * @param qcm le qcm
     * @returns {any[]}
     */
    renderQcm(qcm: ?QCM) {
        if (qcm) {
            return qcm.questions.map((question: Question) => {
                return (

                    this.renderQuestion(this.props.students, question)


                );
            });
        }
    }

    render() {
        return (
            <div>
                <Subheader>{this.props.qcm ? this.props.qcm.title : ""}</Subheader>
                <Table selectable={false}>
                    <TableHeader displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Question</TableHeaderColumn>
                            {this.props.students.map((student: Student) => {
                                return (<TableHeaderColumn> {student.firstName} {student.lastName}</TableHeaderColumn>);
                            })}
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} selectable={false}>
                        {this.renderQcm(this.props.qcm)}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default DisplayQCMAnswers;
