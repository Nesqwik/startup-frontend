import type {Answer} from "./Answer"

export type Question = {
    answers: Array<Answer>,
    id?: number,
    nbPoints: number,
    query: string
}