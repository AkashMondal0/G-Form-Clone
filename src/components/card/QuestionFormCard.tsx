import React, { useState, useCallback } from 'react'
import {
    Button, Input, Switch,
    Radio,
    Card,
    List,
    ListItem,
    ListItemPrefix,
    Typography
} from "../../app/material";
import { HiXMark, HiPlus } from "react-icons/hi2";
import { v4 as uuidv4 } from 'uuid';
import { option, question } from '@/interfaces/interfaces';

interface QuestionFormCardProps {
    addQuestion: (data: question) => void,
    removeQuestion: (id: string) => void,
    updateQuestion: (data: question, id: string) => void,
}

const QuestionFormCard: React.FC<QuestionFormCardProps> = ({
    // title, options, answer, required, id,
    addQuestion,
}) => {
    // set form data
    const [optionsList, setOptionsList] = useState<option[]>([]);
    const [option, setOption] = useState<option>({
        id: uuidv4(),
        value: ""
    }) // ref 
    const [optionUpdate, setOptionUpdate] = useState<option>({
        id: '',
        value: ""
    }) // ref
    const [question, setQuestion] = useState<question>({
        title: "",
        options: optionsList,
        answer: {
            id: "",
            value: ""
        },
        required: false,
        id: uuidv4() // id get from url
    })

    // for option

    const addQuestion_Option = useCallback(() => {
        setOptionsList([...optionsList, option])
        setOption({
            id: uuidv4(),
            value: ""
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

    // for question update

    const handleSubmit = useCallback(() => {
        const data: question = {
            id: question.id,
            title: question.title,
            options: optionsList,
            answer: question.answer,
            required: question.required
        }
        addQuestion(data)
        // console.log(data)
        setQuestion({
            title: "",
            options: [],
            answer: {
                id: "",
                value: ""
            },
            required: false,
            id: uuidv4()
        })
        setOptionsList([])
    }, [question, optionsList, addQuestion])


    return (
        <Card>
            <div className='p-8'>
                <div className='title'>
                    <div className='h-1 w-full flex justify-end'>
                        {question.required && <span className="text-red-500 mr-1 text-2xl text-end">*</span>}
                    </div>
                    <div className='my-2 flex gap-4'>
                        {/* <h1 className='my-4 text-lg font-semibold'>{0})</h1> */}
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
                </div>
                {/* /// array data// */}
                {optionsList.map((item, index) => {
                    return (
                        <div className="flex items-center my-4" key={index}>
                            <label htmlFor={question.id} className="px-3 py-2 flex items-center w-full cursor-pointer">
                                <ListItemPrefix className="mr-3">
                                    <Radio
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
                {/* ///// */}
                <div className='flex items-center my-6'>
                    <label htmlFor="vertical-list-svelte" className="px-3 py-2 flex items-center w-full cursor-pointer">
                        <ListItemPrefix className="mr-3">
                            <Radio
                                disabled
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
                                variant="standard" label={`Option ${optionsList.length + 1}`} />
                        </div>
                        <div className='cursor-pointer'>
                            <HiPlus onClick={addQuestion_Option} size={30} />
                        </div>
                    </label>
                </div>

                <div className='flex justify-between'>
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
                    <Button color='green' onClick={handleSubmit}>add Question</Button>
                </div>
            </div>
        </Card>
    )

}

export default QuestionFormCard