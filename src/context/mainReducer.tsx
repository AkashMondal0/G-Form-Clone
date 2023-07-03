// Date: 04/08/21
import { FormPage, MainState, action, userResponse } from "@/interfaces/interfaces"

export const initialState: MainState = {
    Author: null,
    token: null,
    data: [],
    isLogged: false,
    loading: false,
    status: null,
    error: false,
}

export const getLocal = () => {
    if (typeof window !== "undefined") {
        const Local = localStorage.getItem('GoForm')
        return localStorage.getItem('GoForm') ? JSON.parse(Local!) : false;
    }
}

export const MainReducer = (state: MainState, action: action): MainState => {
    switch (action.type) {
        case 'START':
            return state = action.payload

        // 
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

        // unique type logic
        case 'VIEW_SUBMIT_FORM':
            const Data_From_User: userResponse = action.payload
            const indexFrom = state.data.findIndex((item) => item.id === Data_From_User.formId)

            if (indexFrom !== -1) {
                const indexUserResponse = state.data[indexFrom].userResponse.findIndex((item) => item.userId === Data_From_User.userId)
                if (indexUserResponse !== -1) {
                    state.data[indexFrom].userResponse.splice(indexUserResponse, 1, Data_From_User)
                    // console.log('replace')
                } else {
                    // console.log('push')
                    state.data[indexFrom].userResponse.push(Data_From_User)
                }

                Data_From_User.userAnswers.map((question) => {
                    const questionFindIndex = state.data[indexFrom].questions.findIndex((item) => item.id === question.questionId)
                    const SameId = state.data[indexFrom].questions[questionFindIndex].responses.findIndex((item) => item.userId === question.userId)
                    if (questionFindIndex !== -1 && SameId !== -1) {
                        return state.data[indexFrom].questions[questionFindIndex].responses.splice(SameId, 1, question)
                    } else {
                        state.data[indexFrom].questions[questionFindIndex].responses.push(Data_From_User.userAnswers[questionFindIndex])
                        return state
                    }
                })
            }
            // 
            localStorage.setItem('GoForm', JSON.stringify(state))
            return state

        default:
            return state
    }
}