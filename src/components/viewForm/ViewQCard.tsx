'use client'
import { Card, List, ListItem, ListItemPrefix, Radio, Typography } from '@/app/material'
import { option, question, sendAnswer } from '@/interfaces/interfaces'
import React, { useState } from 'react'


interface ViewQCardProps {
    question: question
    ShowAnswer: boolean
    index: number
    sendAnswer: (data: sendAnswer) => void
}

const ViewQCard: React.FC<ViewQCardProps> = ({
    question,
    ShowAnswer,
    sendAnswer,
    index,
}) => {
    const { title, options, required, id, answer, responses } = question

    const handleSubmit = (optionValue: option) => {
        sendAnswer({
            questionId: id,
            userId: "23323245673489",
            userOption: optionValue,
            id: ''
        })

    }

    return (
        <div className='my-5'>
            <Card>
                <div className='h-2 w-full flex justify-end p-3 px-5'>
                    {required && <span className="text-red-500 text-3xl text-end">*</span>}
                </div>
                <List>
                    <div className='ml-4 m-3 break-words text-start'>
                        <Typography variant="h5">{index + 1}) {title || ""}</Typography>
                    </div>
                    {options.map((item, index) => {
                        return <ListItem className="p-0" key={index}>
                            <label htmlFor={item.id} className="px-3 py-2 flex items-center w-full cursor-pointer">
                                <ListItemPrefix className="mr-3">
                                    <>
                                        {ShowAnswer ?
                                            <Radio
                                                name={id}
                                                id={item.id}
                                                ripple={false}
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                    className: "p-0"
                                                }}
                                                color='green'
                                                disabled
                                                defaultChecked={answer.id === item.id}
                                            /> :
                                            <Radio
                                                onClick={() => handleSubmit(item)}
                                                name={id}
                                                id={item.id}
                                                ripple={false}
                                                className="hover:before:opacity-0"
                                                containerProps={{
                                                    className: "p-0"
                                                }}
                                                defaultChecked={ShowAnswer && answer.id === item.id}
                                            />}</>
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="font-medium">{item.value}</Typography>
                            </label>
                        </ListItem>
                    })}

                </List>
            </Card>
        </div>
    )
}

export default ViewQCard
