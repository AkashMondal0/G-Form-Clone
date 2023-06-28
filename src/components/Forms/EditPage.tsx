'use client';
import React, { useCallback, useContext, useState } from 'react'
import QuestionCard from '../card/QuestionShowCard';
import QuestionFormCard from '../card/QuestionFormCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';
import TitleBlock from './TitleBlock';
import { FormPage, FormType, question } from '@/interfaces/interfaces';


const EditPage: React.FC = ({ }) => {
    const MainState: any = useContext(MainContext)
    const [QuestionList, setQuestionList] = useState<question[]>([])
    const [Form, setForm] = useState<FormPage>(FormType)

    const addQuestion = useCallback((data: question) => {
        setQuestionList([...QuestionList, {
            title: data.title,
            id: data.id,
            options: data.options,
            answer: data.answer,
            required: data.required
        }])
    }, [QuestionList])

    const removeQuestion = useCallback((id: string) => {
        const newData = QuestionList.filter((item) => item.id !== id)
        setQuestionList(newData)
    }, [QuestionList])

    const updateQuestion = useCallback((data: question) => {

        const newData = QuestionList.map((item) => {
            if (item.id === data.id) {
                return {
                    title: data.title,
                    id: data.id,
                    options: data.options,
                    answer: data.answer,
                    required: data.required
                }
            } else {
                return item
            }
        })
        setQuestionList(newData)
    }, [QuestionList])
    // for question save 
    const handleSubmit = () => {
        const newForm = {
            ...Form,
            questions: QuestionList
        }
        // update function 
        // console.log(newForm)
        MainState.FormSubmit(newForm)
    }
    return (
        <div className='w-max-[500px] mx-auto'>
            <TitleBlock Value={Form} onChangeValue={setForm} />
            {/* show array questions */}
            {QuestionList.map((item: question, index: number) => {
                return (
                    <div className='my-5' key={index}>
                        <QuestionCard
                            title={item.title}
                            index={index}
                            options={item.options}
                            answer={item.answer}
                            required={item.required}
                            id={item.id}
                            updateQuestion={updateQuestion}
                            removeQuestion={removeQuestion} />
                    </div>
                )
            })}

            <div className='my-4'>
                <QuestionFormCard
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                    updateQuestion={updateQuestion}
                />
            </div>

            <div className='my-4'>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}


export default EditPage