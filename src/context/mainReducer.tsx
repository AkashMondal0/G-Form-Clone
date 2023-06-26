// Date: 04/08/21
import { MainState, action } from "@/interfaces/interfaces"

const getLocal = () => {
    if (typeof window !== "undefined") {
        const Local = localStorage.getItem('GoForm')
        return localStorage.getItem('GoForm') ? JSON.parse(Local!) : [];
    }
}

export const initialState: MainState = {
    Author: null,
    token: null,
    data: [], // TODO - change to empty array
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
        case 'LOGIN':
            return state = action.payload
        case 'LOGOUT':
            return {
                ...state,
                isLogged: false,
                token: null,
            }
        case 'START':
            return state = action.payload
        default:
            return state
    }
}