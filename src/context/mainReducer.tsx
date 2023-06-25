// Date: 04/08/21
interface option {
    id: string,
    value: string,
}

interface question {
    id: string,
    title: string,
    options: option[],
    answer: string,
    required: boolean,
}

interface FormPage {
    userName: string,
    userId: string,
    date: Date,
    questions: question[]
}

interface action {
    type: string,
    payload: FormPage[]
}

interface option {
    id: string,
    value: string,
}
interface question {
    id: string,
    title: string,
    options: option[],
    answer: string,
    required: boolean,
}
interface Author {
    name: string,
    email: string,
    password: string,
    date: Date
    forms: question
}

interface FormPage {
    userName: string,
    userId: string,
    date: Date,
    questions: question[]
}
interface MainStateInterface {
    Author: Author | null,
    token: string | null,
    data: FormPage[] | Array<any>,
    isLogged: boolean,
    loading: boolean,
    status: number | null,
    error: boolean,

}
export const initialState: MainStateInterface = {
    Author: null,
    token: null,
    data: [],
    isLogged: false,
    loading: false,
    status: null,
    error: false,
}

export const MainReducer = (state: any, action: action) => {
    switch (action.type) {
        case 'AUTHOR':
            return {
                ...state,
            }
        case 'SUBMIT_UPLOAD_FORM':
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state
    }
}