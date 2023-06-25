export interface MainStateProps {
    children: React.ReactNode
}
export interface option {
    id: string,
    value: string,
}
export interface question {
    id: string,
    title: string,
    options: option[],
    answer: string,
    required: boolean,
}
export interface FormPage {
    id: string,
    userName: string,
    userId: string,
    date: Date,
    questions: question[]
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