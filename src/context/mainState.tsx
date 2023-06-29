'use client'
import React, { useCallback, useEffect, useReducer } from 'react'
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

    const FormSubmit = useCallback((newForm: FormPage) => {
        const data = [...state.data, newForm]
        dispatch({
            type: 'SUBMIT_UPLOAD_FORM',
            payload: data
        })
    }, [state.data])

    const updateForm = useCallback((newForm: FormPage) => {
        const findIndex = state.data.findIndex((item: FormPage) => item.id === newForm.id)
        state.data.splice(findIndex, 1, newForm)
        console.log(state)
        dispatch({
            type: 'UPDATE_STATE_FORM',
            payload: state
        })
    }, [state])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const localData = getLocal()
            if (localData) {
                dispatch({
                    type: 'START',
                    payload: getLocal()
                })
            }
        }
    }, [])

    return (
        <MainContext.Provider value={{
            state,
            dispatch,
            FormSubmit,
            updateForm,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainState