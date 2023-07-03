'use client'
import React, { useEffect, useReducer } from 'react'
import MainContext from './mainContext'
import { MainReducer, getLocal, initialState } from './mainReducer'


interface MainStateProps {
    children: React.ReactNode
}

const MainState: React.FC<MainStateProps> = ({
    children
}) => {
    const [state, dispatch] = useReducer(MainReducer, initialState)

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
    // console.log(state.data)
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