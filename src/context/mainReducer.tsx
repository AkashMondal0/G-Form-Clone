// Date: 04/08/21
import { DeleteForm, UpdateForm, updateUserFirebase } from "@/app/form";
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
        const Local = localStorage.getItem('GoForm-uid')
        return localStorage.getItem('GoForm-uid') ? JSON.parse(Local!) : false;
    }
}

export const setLocal = (data: string) => {
    if (typeof window !== "undefined") {
        localStorage.setItem('GoForm-uid', JSON.stringify(data))
    }
}

export const MainReducer = (state: MainState, action: action): MainState => {
    switch (action.type) {
        case 'START':
            return state = action.payload

        case 'Create_Form':
            const data = [...state.data, action.payload.id]
            const Create_Form_newData = {
                ...state,
                data: data,
            }
            updateUserFirebase(Create_Form_newData)
            return Create_Form_newData

        case 'Update_Form':
            const Update_Form_newForm = action.payload
            UpdateForm(Update_Form_newForm)          
            return state

        case 'Remove_Form':
            const Remove_Form_newData = {
                ...state,
                data: state.data.filter((item) => item !== action.payload)
            }
            updateUserFirebase(Remove_Form_newData)
            DeleteForm(action.payload)
            return Remove_Form_newData

        // unique type logic
        case 'VIEW_SUBMIT_FORM':
            const Data_From_User: userResponse = action.payload.userResponse
            const submitForm: FormPage = action.payload.form

            if (submitForm) {
                const indexUserResponse = submitForm.userResponse.findIndex((item) => item.userId === Data_From_User.userId)
                if (indexUserResponse !== -1) {
                    submitForm.userResponse.splice(indexUserResponse, 1, Data_From_User)
                    // console.log('replace')
                } else {
                    // console.log('push')
                    submitForm.userResponse.push(Data_From_User)
                }

                Data_From_User.userAnswers.map((question) => {
                    const questionFindIndex = submitForm.questions.findIndex((item) => item.id === question.questionId)
                    const SameId = submitForm.questions[questionFindIndex].responses.findIndex((item) => item.userId === question.userId)

                    if (questionFindIndex !== -1 && SameId !== -1) {
                        return submitForm.questions[questionFindIndex].responses.splice(SameId, 1, question)
                    } else {
                        submitForm.questions[questionFindIndex].responses.push(Data_From_User.userAnswers[questionFindIndex])
                        submitForm.questions[questionFindIndex].options.map((item) => {
                            if (item.id === question.userOption.id) {
                                item.responsesCount = +1
                                item.responsesUserId?.push(Data_From_User.userId)
                                // console.log("increment")
                            }
                        })
                        return submitForm
                    }
                })
            }
            UpdateForm(submitForm)
            return state
        case 'REGISTER':
            // const { displayName, email, photoURL, uid } = action.payload
            console.log("displayName, email, photoURL, uid")
            // const Register_newData = {
            //     ...state,
            //     Author: action.payload,
            // }
            // localStorage.setItem('GoForm-uid', JSON.stringify(Register_newData))
            return state

        case 'LOGOUT':
            const Logout_newData = {
                ...state,
            }
            localStorage.setItem('GoForm-uid', JSON.stringify(Logout_newData))
            return Logout_newData

        case 'LOGIN':
            const Login_newData = {
                ...state,
            }
            localStorage.setItem('GoForm-uid', JSON.stringify(Login_newData))
            return Login_newData

        default:
            return state
    }
}