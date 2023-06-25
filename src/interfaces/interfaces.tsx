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
export interface Author {
    name: string,
    email: string,
    password: string,
    date: Date
    forms: question
}

export interface FormPage {
    userName: string,
    userId: string,
    date: Date,
    page: []
}
export interface MainState {
    Author: Author | null,
    token: string | null,
    data: FormPage[] | null,
    isLogged: boolean,
    loading: boolean,
    status: number | null,
    error: boolean,

}

