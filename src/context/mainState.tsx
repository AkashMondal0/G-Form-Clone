import React, { useCallback, useReducer, useState } from 'react'
import MainContext from './mainContext'
import { MainReducer } from './mainReducer'

interface MainStateProps {
    children: React.ReactNode
}
interface option {
    id: string,
    value: string,
}
interface question {
    id: string,
    title: string,
    options: option[],
    answer: string,
    required: boolean,
}
interface Author {
    name: string,
    email: string,
    password: string,
    date: Date
    forms: question
}

interface FormPage {
    userName: string,
    userId: string,
    date: Date,
    page: []
}
interface MainStateInterface {
    Author: Author | null,
    token: string | null,
    data: FormPage[] | null,
    isLogged: boolean,
    loading: boolean,
    status: number | null,
    error: boolean,

}
const getLocal = () => {
    const list = localStorage.getItem('question')
    if (list) {
        return JSON.parse(list || "")
    } else {
        return []
    }
}
const MainState: React.FC<MainStateProps> = ({
    children
}) => {
    const [QuestionList, setQuestionList] = useState<question[]>(getLocal())

    const initialState: MainStateInterface = {
        Author: null,
        token: null,
        data: null,
        isLogged: false,
        loading: false,
        status: null,
        error: false,
    }

    const [state, dispatch] = useReducer(MainReducer, initialState)


    const addQuestion = useCallback((data: question) => {
        setQuestionList([...QuestionList, {
            id: data.id,
            title: data.title,
            options: data.options,
            answer: data.answer,
            required: data.required
        }])
    }, [QuestionList])

    const removeQuestion = useCallback((id: string) => {
        const newData = QuestionList.filter((item) => item.id !== id)
        setQuestionList(newData)
    }, [QuestionList])

    const updateQuestion = useCallback((data: question) => {

    }, [])

    const handleSubmit = useCallback(() => {
        // localStorage.setItem('question', JSON.stringify(QuestionList))
        dispatch({
            type: 'SUBMIT_UPLOAD_FORM',
            payload: QuestionList
        })
    }, [QuestionList])
    console.log(state)

    return (
        <MainContext.Provider value={{
            state, dispatch,
            addQuestion,
            removeQuestion,
            updateQuestion,
            handleSubmit,
            QuestionList
        }}>
        {children}
        </MainContext.Provider>
    )
}

export default MainState