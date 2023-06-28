'use client'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import MainContext from './mainContext'
import { MainReducer, initialState } from './mainReducer'
import { FormPage } from '@/interfaces/interfaces'
const getLocal = () => {
    if (typeof window !== "undefined") {
        const Local = localStorage.getItem('GoForm')
        return localStorage.getItem('GoForm') ? JSON.parse(Local!) : false;
    }
}

interface MainStateProps {
    children: React.ReactNode
}


const MainState: React.FC<MainStateProps> = ({
    children
}) => {
    const [state, dispatch] = useReducer(MainReducer, initialState)
    const [forms, setForms] = useState<FormPage[]>([])

    const FormSubmit = useCallback((newForm: FormPage) => {
        const forms = getLocal().data
        const replace = forms.find((form: FormPage) => form.id === newForm.id)
        console.log(replace)
        // console.log(newForm)

        // const stateData = [...state.data, newForm]
        // console.log(newForm)
        // console.log(findAndUpdate)
        // const data = [...state.data, newForm]
        // dispatch({
        //     type: 'SUBMIT_UPLOAD_FORM',
        //     payload: data
        // })
    }, [forms])

    // console.log(forms)
    useEffect(() => {
        if (typeof window !== "undefined") {
            const localData = getLocal()
            if (localData) {
                dispatch({
                    type: 'START',
                    payload: getLocal()
                })
                setForms(getLocal().data)
            }
        }
    }, [])

    // console.log(state)

    return (
        <MainContext.Provider value={{
            state,
            dispatch,
            FormSubmit,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainState