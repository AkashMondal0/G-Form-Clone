/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from '@/app/material'
import React, { useContext, useState } from 'react'
import ViewQCard from './ViewQCard'
import { FormPage, MainStateProvider, sendAnswer, userAnswers, userResponse } from '@/interfaces/interfaces'
import Navbar from '../Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
import MainContext from '@/context/mainContext'

interface ViewFormProps {
    form: FormPage
    ShowAnswer: boolean
}
const ViewForm: React.FC<ViewFormProps> = ({
    form,
    ShowAnswer
}) => {
    const MainState = useContext<MainStateProvider>(MainContext)
    const { title, description, questions, id } = form
    const [userAnswer, setUserAnswer] = useState<userResponse>({
        id: uuidv4(),
        userId: "akashI3456D5dv623457",
        formId: id,
        userAnswers: []
    })


    const sendAnswer = (data: sendAnswer) => {
        const { questionId, optionValue }: sendAnswer = data
        const answer: userAnswers = {
            questionId: questionId,
            userOption: optionValue
        }
        const findIndex = userAnswer.userAnswers.findIndex((item) => item.questionId === questionId)
        if (findIndex !== -1) {
            userAnswer.userAnswers.splice(findIndex, 1, answer)
        }
        else {
            setUserAnswer({
                ...userAnswer,
                userAnswers: [...userAnswer.userAnswers, answer]
            })
        }
    }

    const handleSubmit = () => {
        MainState.dispatch({
            type: "VIEW_SUBMIT_FORM",
            payload: userAnswer
        })
    }

    return (
        <React.Fragment>
            <Navbar title={title} />
            <div className='flex justify-center p-5 bg-gray-200 min-h-[100vh]'>
                <div className='text-center'>
                    <div className='my-6 lg:mb-10'>
                        <Typography variant="h1">{title || "Loading..."}</Typography>
                        <Typography variant="lead">{description || ""}</Typography>
                    </div>
                    <div className='flex justify-center'>
                        <div className='w-[500px]'>
                            {questions.map((item, index) => <ViewQCard
                                sendAnswer={sendAnswer} key={item.id}
                                question={item} ShowAnswer={ShowAnswer}
                                index={index} />)}
                        </div>
                    </div>
                    <div className='my-4'>
                        <Button onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>
                </div>
            </div >
        </React.Fragment>
    )
}

export default ViewForm
