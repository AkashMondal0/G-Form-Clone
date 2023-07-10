'use client'
import React, { useEffect, useReducer } from 'react'
import MainContext from './mainContext'
import { MainReducer, getLocal, initialState } from './mainReducer'
import { GetUserDetails } from '@/app/form'


interface MainStateProps {
    children: React.ReactNode
}

const MainState: React.FC<MainStateProps> = ({
    children
}) => {
    const [state, dispatch] = useReducer(MainReducer, initialState)

    const getUser = async () => {
        if (typeof window !== "undefined") {
            const LocalToken = getLocal()
            const localData = await GetUserDetails(LocalToken)
            dispatch({
                type: 'START',
                payload: localData
            })
        }
    }
    useEffect(() => {
     getUser()
    }, [])

    return (
        <MainContext.Provider value={{
            state,
            dispatch,
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainState