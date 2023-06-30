// Date: 04/08/21
import { FormPage, MainState, action } from "@/interfaces/interfaces"

export const initialState: MainState = {
    Author: null,
    token: null,
    data: [],
    isLogged: false,
    loading: false,
    status: null,
    error: false,
}

export const MainReducer = (state: MainState, action: action): MainState => {
    switch (action.type) {
        case 'START':
            return state = action.payload

        // new update code
        case 'Create_Form':
            const data = [...state.data, action.payload]
            const Create_Form_newData = {
                ...state,
                data: data,
            }
            localStorage.setItem('GoForm', JSON.stringify(Create_Form_newData))
            return Create_Form_newData

        case 'Update_Form':
            const Update_Form_newForm = action.payload
            const findIndex = state.data.findIndex((item: FormPage) => item.id === Update_Form_newForm.id)
            state.data.splice(findIndex, 1, Update_Form_newForm)
            localStorage.setItem('GoForm', JSON.stringify(state))
            return state = {
                ...state,
                data: state.data,
            }
        case 'Remove_Form':
            const Remove_Form_Data = state.data.filter((item: FormPage) => item.id !== action.payload)
            const Remove_Form_newData = {
                ...state,
                data: Remove_Form_Data,
            }
            localStorage.setItem('GoForm', JSON.stringify(Remove_Form_newData))
            return Remove_Form_newData
        default:
            return state
    }
}