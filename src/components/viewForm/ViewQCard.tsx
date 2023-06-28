'use client'
import { Card, List, ListItem, ListItemPrefix, Radio, Typography } from '@/app/material'
import { question } from '@/interfaces/interfaces'
import React from 'react'

interface ViewQCardProps {
    question: question
    ShowAnswer: boolean
}

const ViewQCard: React.FC<ViewQCardProps> = ({
    question,
    ShowAnswer
}) => {

    const { title, options, required, id, answer } = question

    return (
        <div className='my-5'>
            <Card>
                <div className='h-2 w-full flex justify-end p-3 px-5'>
                    {required && <span className="text-red-500 text-3xl text-end">*</span>}
                </div>
                <List>
                    <div className='ml-4 m-3 break-words text-start'>
                        <Typography variant="h5">{title || ""}</Typography>
                    </div>
                    {options.map((item, index) => {
                        return <ListItem className="p-0" key={index}>
                            <label htmlFor={item.id} className="px-3 py-2 flex items-center w-full cursor-pointer">
                                <ListItemPrefix className="mr-3">
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
                                            name={id}
                                            id={item.id}
                                            ripple={false}
                                            className="hover:before:opacity-0"
                                            containerProps={{
                                                className: "p-0"
                                            }}
                                            defaultChecked={ShowAnswer && answer.id === item.id}
                                        />}
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
