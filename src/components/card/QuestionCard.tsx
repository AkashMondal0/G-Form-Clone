import React, { useState, useCallback, useEffect } from 'react'
import { Button, Input } from "../../app/material";
import { HiXMark, HiPlus } from "react-icons/hi2";

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

interface QuestionFormCardProps {
    title: string,
    options: option[],
    answer: string,
    required: boolean,
    id: string,
    index: number,
    removeQuestion: (id: string) => void,
    updateQuestion: (data: question, id: string) => void,
}

const QuestionCard: React.FC<QuestionFormCardProps> = ({
    title, options, answer, required, id, index,
    removeQuestion,
    updateQuestion
}) => {

    const cardId = id

    const [optionsList, setOptionsList] = useState<option[]>(options);

    const [option, setOption] = useState<option>({
        id: Math.random().toString(36).substr(2, 9),
        value: ""
    }) // ref 

    const [optionUpdate, setOptionUpdate] = useState<option>({
        id: '',
        value: ""
    }) // ref

    const [question, setQuestion] = useState<question>({
        title: title,
        options: optionsList,
        answer: answer,
        required: required,
        id: Math.random().toString(36).substr(2, 9)
    })

    // for option

    const addQuestion_Option = useCallback(() => {
        setOptionsList([...optionsList, option])
        setOption({
            id: Math.random().toString(36).substr(2, 9),
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
        // console.log(findOption)
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
        const data: question = {
            id: question.id,
            title: question.title,
            options: newData,
            answer: question.answer,
            required: question.required
        }
        updateQuestion(question, cardId)
    }, [optionsList, question, optionUpdate, cardId, updateQuestion])


    return (
        <div>
            <div className='border rounded-lg p-6 my-10'>
                {/* {required && <span className="text-red-500 mr-1">*</span>} */}
                <div className='my-10 flex gap-4'>
                    <h1 className='my-4 text-lg font-semibold'>{index+1})</h1>
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
                            <input id={question.id} type="radio" name={`${question.id}`} defaultValue={item.value} className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" defaultChecked />
                            <label htmlFor={question.id} className="text-sm font-medium text-gray-900 ml-2 block">
                                {/* {option.value} */}
                            </label>
                            <div className="flex flex-col w-60 mx-2">
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
                        </div>
                    )
                })}

                {/* ///// */}
                <div className="flex items-center my-6" >
                    <input disabled id={question.id} type="radio" name={`${question.id}`} defaultValue={question.title} className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" defaultChecked />
                    <label htmlFor={question.id} className="text-sm font-medium text-gray-900 ml-2 block">
                        {/* {option.value} */}
                    </label>
                    <div className="flex flex-col w-60 mx-2">
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
                </div>
                {/* <Button onClick={handleSubmit}>add Question</Button> */}
            </div>
        </div>
    )

}

export default QuestionCard