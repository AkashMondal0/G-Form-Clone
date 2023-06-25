import React, { useCallback, useReducer, useState } from 'react'
import MainContext from './mainContext'
import { MainReducer, initialState } from './mainReducer'
import { v4 as uuidv4 } from 'uuid';

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
    id: string,
    userName: string,
    userId: string,
    date: Date,
    questions: question[]
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
        const newData = QuestionList.map((item) => {
            if (item.id === data.id) {
                return {
                    id: data.id,
                    title: data.title,
                    options: data.options,
                    answer: data.answer,
                    required: data.required
                }
            } else {
                return item
            }
        })
        setQuestionList(newData)
    }, [QuestionList])

    const handleSubmit = useCallback(() => {
        const newForm: FormPage = {
            id: uuidv4(),
            userName: 'akash olivia',
            userId: 'fwofwefiohwiofh',
            date: new Date(),
            questions: QuestionList
        }
        const data = [...state.data, newForm]
        dispatch({
            type: 'SUBMIT_UPLOAD_FORM',
            payload: data
        })
    }, [QuestionList, state])

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