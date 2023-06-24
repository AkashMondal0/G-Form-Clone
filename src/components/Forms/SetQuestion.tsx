'use client';
import React, { useState, useEffect, useRef, useCallback, use } from 'react'
import { Button, Input } from "../../app/material";
import QuestionCard from '../QuestionCard';

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


const SetQuestion = () => {

    const [optionsList, setOptionsList] = useState<option[]>([]);
    const [QuestionList, setQuestionList] = useState<question[]>([])
    const [option, setOption] = useState<option>({
        id: "",
        value: ""
    })
    const [question, setQuestion] = useState<question>({
        title: "",
        options: optionsList,
        answer: "",
        required: false,
        id: Math.random().toString(36).substr(2, 9)
    })

    // Question Option
    const addQuestion_Option = useCallback((data: option) => {
        setOptionsList([...optionsList, {
            id: Math.random().toString(36).substr(2, 9),
            value: data.value
        }])
        setOption({
            id: "",
            value: ""
        })
    }, [optionsList])

    const updateQuestion = useCallback((data: question) => {
        console.log(data)
    }, [])

    const removeQuestion = useCallback((id: string) => {
        const newData = QuestionList.filter((item) => item.id !== id)
        setQuestionList(newData)
    }, [QuestionList])



    // Question List
    const addQuestion = useCallback((data: question) => {
        setQuestionList([...QuestionList, {
            title: question.title,
            options: optionsList,
            answer: "rrr",
            required: false,
            id: Math.random().toString(36).substr(2, 9)
        }])
        setOption({
            id: "",
            value: ""
        })
        setQuestion({
            title: "",
            options: optionsList,
            answer: "",
            required: false,
            id: ""
        })
        setOptionsList([])
        setOption({
            id: "",
            value: ""
        })
    }, [QuestionList, optionsList, question.title])

    console.log(QuestionList)


    return (
        <div>
            {QuestionList.map((item, index) => {
                return (
                    <QuestionCard
                        key={index}
                        title={item.title}
                        options={item.options}
                        answer={item.answer}
                        required={item.required}
                        id={item.id}
                        updateQuestion={updateQuestion}
                        removeQuestion={removeQuestion}
                    />
                )
            })
            }
            {/* Question static */}
            <div className='border rounded-lg p-3 my-10'>
                {/* {required && <span className="text-red-500 mr-1">*</span>} */}
                <div className='my-10 flex gap-4'>
                    <h1 className='my-4 text-lg font-semibold'>{0})</h1>
                    <Input
                        multiple
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                title: e.target.value
                            })
                        }}
                        value={question.title}
                        variant="standard" label="Untitled Question" />
                </div>

                {optionsList.map((item, index) => {
                    return (
                        <div className="flex items-center my-4" key={index}>
                            <input id={"option.value"} type="radio" name={`${'saxcs'}`} defaultValue={item.value} className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" defaultChecked />
                            <label htmlFor={""} className="text-sm font-medium text-gray-900 ml-2 block">
                                {/* {option.value} */}
                            </label>
                            <div className="flex flex-col w-full mx-2">
                                <Input
                                    multiple
                                    onChange={(e) => {
                                        setOption({
                                            ...option,
                                            value: e.target.value
                                        })
                                    }}
                                    value={item.value}
                                    variant="static" />
                            </div>
                            {/* <Button onClick={() => { removeQuestion_Option(item.id) }}>delete</Button> */}
                        </div>
                    )
                })}


                <div className="flex items-center my-4">
                    <input id={"option.value"} type="radio" name={`${'saxcs'}`} defaultValue={question.title} className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" defaultChecked />
                    <label htmlFor={""} className="text-sm font-medium text-gray-900 ml-2 block">
                        {/* {option.value} */}
                    </label>
                    <div className="flex flex-col w-full mx-2">
                        <Input
                            multiple
                            onChange={(e) => {
                                setOption({
                                    ...option,
                                    value: e.target.value
                                })
                            }}
                            value={option.value}
                            variant="standard" label={`Option ${optionsList.length + 1}`} />
                    </div>
                    <Button onClick={() => { addQuestion_Option(option) }}>add</Button>
                </div>
            </div>

            <Button onClick={() => { addQuestion(question) }}>add Question</Button>
        </div>
    )
}

export default SetQuestion