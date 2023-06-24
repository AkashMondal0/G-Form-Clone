'use client';

import React, { useCallback, useEffect, useState } from 'react'
import { Button, Input } from "../app/material";
interface option {
    id: string,
    value: string,
}
interface question {
    id: string,
    title: string,
    options: option[],
    answer: string,
    required: boolean
}
interface QuestionCardProps {
    title: string,
    options: option[],
    answer: string,
    required: boolean,
    id: string
    updateQuestion: (data: question) => void
    removeQuestion: (id: string) => void
}
const QuestionCard: React.FC<QuestionCardProps> = ({
    title, options, answer, required, id,
    updateQuestion,
    removeQuestion,
}) => {

    const [data, setData] = useState<question>({
        title: title,
        options: options,
        answer: answer,
        required: required,
        id: id
    })
    const [option, setOption] = useState<option[]>(options)


    const remove_Option = useCallback((id: string) => {
        const newData = option.filter((item) => item.id !== id)
        setOption(newData)
        setData({
            ...data,
            options: newData
        })
    }, [option, data])



    const update_Option = useCallback((id: string) => {
        updateQuestion(data)
    }, [data, updateQuestion])



    return (
        <div className='border rounded-lg p-3 my-10'>
            {/* {required && <span className="text-red-500 mr-1">*</span>} */}
            <div className='my-10 flex gap-4'>
                <h1 className='my-4 text-lg font-semibold'>{0})</h1>
                <Input
                    multiple
                    onChange={(e) => {
                        setData({
                            ...data,
                            title: e.target.value
                        })
                    }}
                    value={data.title}
                    variant="standard" label="Untitled Question" />
            </div>

            {option.map((item, index) => {
                return (
                    <div className="flex items-center my-4" key={index}>
                        <input id={data.title} type="radio" name={`${'saxcs'}`} defaultValue={item.value} className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" defaultChecked />
                        <label htmlFor={""} className="text-sm font-medium text-gray-900 ml-2 block">
                            {/* {option.value} */}
                        </label>
                        <div className="flex flex-col w-full mx-2">
                            <Input
                                multiple
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                    })
                                }}
                                value={item.value}
                                variant="static" />
                        </div>
                        <Button color='red' onClick={() => { remove_Option(item.id) }}>delete</Button>
                    </div>
                )
            })}
            <div className='flex gap-3'>
                <Button color='red' onClick={() => {
                    removeQuestion(id)
                }}>delete q</Button>
                <Button color='green' onClick={() => {
                    update_Option(id)
                }}>update</Button>
            </div>
        </div>
    )
}

export default QuestionCard