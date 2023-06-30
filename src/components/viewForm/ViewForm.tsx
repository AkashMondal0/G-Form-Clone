/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from '@/app/material'
import React, { useEffect, useState } from 'react'
import ViewQCard from './ViewQCard'
import { FormPage, ResponseOption, question, sendAnswer, userResponse } from '@/interfaces/interfaces'
import Navbar from '../Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';

interface ViewFormProps {
    form: FormPage
    ShowAnswer: boolean
}
const ViewForm: React.FC<ViewFormProps> = ({
    form,
    ShowAnswer
}) => {

    const { title, description, questions, id } = form
    const [userAnswer, setUserAnswer] = useState<question[]>([])

    const handleSubmit = () => {
        const userAnswer: userResponse = {
            id: uuidv4(),
            userId: "akashID", 
            formId: id,
            userAnswers: questions
        }
        //TODO update form by id
        console.log("userAnswer", userAnswer)
    }

    useEffect(() => {
        setUserAnswer(questions)
    }, [form])

    const sendAnswer = (data: sendAnswer) => {
        const { questionId, userId, optionValue }: sendAnswer = data

        const updateAnswer: question[] = userAnswer.map((item) => {
            const ResponseOption = item.responses
            if (item.id === questionId) {
                item.answer = optionValue
                const resInx = ResponseOption.findIndex((item: ResponseOption) => item.userId === userId)
                if (resInx !== -1) {
                    ResponseOption.splice(resInx, 1, data)
                    item.responses = ResponseOption
                } else {
                    item.responses = [...ResponseOption, data]
                }
            }
            return item
        })

        setUserAnswer(updateAnswer)
    }

    // console.log(questions)

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
                        <div className='w-[500px] '>
                            {userAnswer.map((item, index) => <ViewQCard sendAnswer={sendAnswer} key={index} question={item} ShowAnswer={ShowAnswer} />)}
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
