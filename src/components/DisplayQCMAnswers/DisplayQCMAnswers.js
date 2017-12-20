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

class DisplayQCMAnswers extends React.Component<Props, State> {

    state = {};

    constructor(props: Props) {
        super(props);
        this.props.fetchStudents();
        this.props.fetchQCMs();
        this.props.fetchAnswers(this.props.qcmId)
    }

    componentWillReceiveProps(newProps: Props) {
        if (newProps.qcm) {
            if(!this.props.qcm || this.props.qcm.id !== newProps.qcm.id) {
                listenNewAnswer(newProps.qcm.id);
            }
        }
    }


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

    renderQuestion(students: Array<Student>, question: Question) {
        return (
            <TableRow>
                <TableRowColumn>{question.query}</TableRowColumn>
                {students.map(student => this.renderStudentAnswer(student, this.props.answerMap, question.answers))}
            </TableRow>
        )
    }

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
