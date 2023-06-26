import React, { use, useCallback, useEffect, useReducer } from 'react'
import MainContext from './mainContext'
import { MainReducer, initialState } from './mainReducer'
import { FormPage } from '@/interfaces/interfaces'
const getLocal = () => {
    if (typeof window !== "undefined") {
        const Local = localStorage.getItem('GoForm')
        return localStorage.getItem('GoForm') ? JSON.parse(Local!) : [];
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
    }, [state])

    useEffect(() => {
        if (typeof window !== "undefined") {
            dispatch({
                type: 'START',
                payload: getLocal()
            })
        }
    }, [])

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