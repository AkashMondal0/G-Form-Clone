import { v4 as uuidv4 } from 'uuid';
export interface option {
    id: string,
    value: string,
}
export interface question {
    title: string,
    id: string,
    options: option[],
    answer: option,
    required: boolean,
}
export interface FormPage {
    id: string,
    userName: string,
    userId: string,
    date: Date,
    title: string,
    description: string,
    questions: question[]
}

export const FormType = {
    id: uuidv4(), // get path is id
    userName: "null",
    userId: "null",
    date: new Date() ,
    title: "Untitled Form",
    description: "Add Description",
    questions: [
        {
            title: "Untitled Question",
            id: uuidv4(),
            options: [
                {
                    id: uuidv4(),
                    value: "Option 1"
                },
            ],
            answer: {
                id: uuidv4(),
                value: "Option 1"
            },
            required: false,
        },
    ],
}
export interface Author {
    name: string,
    email: string,
    password: string,
    date: Date
    forms: FormPage[]
}
export interface MainState {
    Author: Author | null,
    token: string | null,
    data: FormPage[] | Array<any>,
    isLogged: boolean,
    loading: boolean,
    status: number | null,
    error: boolean,
}

export interface action {
    type: string,
    payload: FormPage[]
}

export interface MainContextInterface {
    state: MainState,
    dispatch: React.Dispatch<action>,
    handleSubmit: () => void,
}

export interface TabProps {
    label: string,
    value: string,
    Body: React.ReactElement
}