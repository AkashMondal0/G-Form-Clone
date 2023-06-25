// Date: 04/08/21
import { MainState, action } from "@/interfaces/interfaces"

export const initialState: MainState = {
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