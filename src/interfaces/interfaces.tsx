
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

export enum FormDummy {
    id = "",
    userName = "",
    userId = "",
    date = new Date() as any,
    title = "",
    description = "",
    questions = [] as any,
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
