import { Button, Typography } from '@/app/material'
import React from 'react'
import ViewQCard from './ViewQCard'
import { FormPage } from '@/interfaces/interfaces'

interface ViewFormProps {
    form: FormPage
    ShowAnswer: boolean
}
const ViewForm: React.FC<ViewFormProps> = ({
    form,
    ShowAnswer
}) => {
    const { title, description, questions } = form

    return (
        <React.Fragment>
            <div className='flex justify-center p-5'>
                <div className='text-center'>
                    <div className='my-6 lg:mb-10'>
                        <Typography variant="h1">{title || "Loading..."}</Typography>
                        <Typography variant="lead">{description || ""}</Typography>
                    </div>
                    <div className='flex justify-center'>
                        <div className='w-[500px] '>
                            {questions.map((item, index) => {
                                return (
                                    <ViewQCard key={index} question={item} ShowAnswer={ShowAnswer} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
        </React.Fragment>
    )
}

export default ViewForm
