/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react'
import { Button, Card, Input, ListItemPrefix, Radio, Switch, Typography } from "../../app/material";
import { HiXMark, HiPlus, HiMiniTrash } from "react-icons/hi2";
import { v4 as uuidv4 } from 'uuid';
import { option, question } from '@/interfaces/interfaces';

interface QuestionFormCardProps extends question {
    index: number,
    removeQuestion: (id: string) => void,
    updateQuestion: (data: question) => void,
}

const QuestionShowCard: React.FC<QuestionFormCardProps> = ({
    title, options, answer, required, id, index, responses,
    removeQuestion,
    updateQuestion,
}) => {

    const [optionsList, setOptionsList] = useState<option[]>(options);
    const [option, setOption] = useState<option>({
        id: uuidv4(),
        value: "",
        responsesCount: 0,
        responsesUserId: []
    }) // ref 

    const [optionUpdate, setOptionUpdate] = useState<option>({
        id: '',
        value: "",
        responsesCount: 0,
        responsesUserId: []
    }) // ref

    const [question, setQuestion] = useState<question>({
        title: title,
        options: optionsList,
        answer: answer,
        required: required,
        id: id,
        responses: responses
    })

    // for option add
    const addQuestion_Option = useCallback(() => {
        setOptionsList([...optionsList, option])
        setOption({
            id: uuidv4(),
            value: "",
            responsesCount: 0,
            responsesUserId: []
        })
    }, [optionsList, option])

    const removeQuestion_Option = useCallback((id: string) => {
        const newData = optionsList.filter((item) => item.id !== id)
        setOptionsList(newData)
        setQuestion({
            ...question,
            options: newData
        })
    }, [optionsList, question])

    // for option update
    const onInputIn = useCallback((id: string) => {
        const findOption = optionsList.find((item) => item.id === id)!
        setOptionUpdate({
            id: findOption.id,
            value: findOption.value
        })
    }, [optionsList])

    const onInputOutUpdate = useCallback((id: string) => {
        const newData = optionsList.map((item) => {
            if (item.id === id) {
                return {
                    ...item,
                    value: optionUpdate.value
                }
            }
            return item
        })
        setOptionsList(newData)
        setQuestion({
            ...question,
            options: newData
        })
    }, [optionsList, question, optionUpdate])

    const submitQuestion = useCallback(() => {
        const data: question = {
            id: id,
            title: question.title,
            options: optionsList,
            answer: question.answer,
            required: question.required,
            responses: question.responses
        }
        updateQuestion(data)
    }, [id, optionsList, question, updateQuestion])

    useEffect(() => {
        setQuestion({
            title: title,
            options: options,
            answer: answer,
            required: required,
            id: id,
            responses: responses
        })
        setOptionsList(options)
    }, [id])

    return (
        <Card>
            <div className='p-6'>
                <div className='h-2 w-full flex justify-end'>
                    {question.required && <span className="text-red-500 mr-1 text-2xl text-end">*</span>}
                </div>
                {/* Question Header */}
                <div className='my-10 flex gap-4'>
                    <h1 className='my-4 text-lg font-semibold'>{index + 1})</h1>
                    <Input
                        name='title'
                        multiple
                        onChange={(e) => {
                            setQuestion({
                                ...question,
                                title: e.target.value
                            })
                        }}
                        value={question.title === "Untitled Question" ? "" : question.title}
                        placeholder={question.title}
                        variant="static"
                    />
                </div>
                {/* /Option // */}
                {optionsList.map((item, index) => {
                    return (
                        <div className="flex items-center my-4" key={index}>
                            <label htmlFor={item.id} className="px-3 py-2 flex items-center w-full cursor-pointer">
                                <ListItemPrefix className="mr-3">
                                    <Radio
                                        defaultChecked={answer.id === item.id}
                                        // checked={answer.id === item.id || false} // TODO: fix this
                                        name={question.id}
                                        id={item.id}
                                        ripple={true}
                                        className="hover:before:opacity-0"
                                        containerProps={{
                                            className: "p-0"
                                        }}
                                        onClick={() => {
                                            setQuestion({
                                                ...question,
                                                answer: {
                                                    id: item.id,
                                                    value: item.value
                                                }
                                            })
                                        }}
                                    />
                                </ListItemPrefix>
                                <div className="flex flex-col w-80 mx-2">
                                    <Input
                                        multiple
                                        onFocus={() => { onInputIn(item.id) }}
                                        onBlur={() => { onInputOutUpdate(item.id) }}
                                        onChange={(e) => {
                                            setOptionUpdate({
                                                ...optionUpdate,
                                                value: e.target.value
                                            })
                                        }}
                                        value={item.id === optionUpdate.id ? optionUpdate.value : item.value}
                                        placeholder={item.value}
                                        variant="static" />
                                </div>
                                <div className='cursor-pointer'>
                                    <HiXMark onClick={() => { removeQuestion_Option(item.id) }} size={30} />
                                </div>
                            </label>
                        </div>
                    )
                })}

                {/* ///add option temp// */}
                <div className="flex items-center my-6" >
                    <label htmlFor="vertical-list-svelte" className="px-3 py-2 flex items-center w-full cursor-pointer">
                        <ListItemPrefix className="mr-3">
                            <Radio
                                disabled
                                name="vertical-list"
                                id="vertical-list-svelte"
                                ripple={true}
                                className="hover:before:opacity-0"
                                containerProps={{
                                    className: "p-0"
                                }}
                            />
                        </ListItemPrefix>
                        <div className="flex flex-col w-80 mx-2">
                            <Input
                                multiple
                                onChange={(e) => {
                                    setOption({
                                        ...option,
                                        value: e.target.value
                                    })
                                }}
                                value={option.value}
                                variant="standard" label={`Add Option ${optionsList.length + 1}`} />
                        </div>
                        <div className='cursor-pointer'>
                            <HiPlus onClick={addQuestion_Option} size={30} />
                        </div>
                    </label>
                </div>
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        <div>
                            <Typography variant='h6' className='text-gray-500'>Required</Typography>
                            <Switch
                                checked={question.required}
                                id={question.id}
                                onChange={() => {
                                    setQuestion({
                                        ...question,
                                        required: !question.required
                                    })
                                }} />
                        </div>
                        <Button color='red' onClick={() => { removeQuestion(id) }}>
                            <HiMiniTrash size={28} />
                        </Button>
                    </div>

                    <Button color='green' onClick={submitQuestion}>Update</Button>
                </div>
            </div>
        </Card>
    )

}

export default QuestionShowCard