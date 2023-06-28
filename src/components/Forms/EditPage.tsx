'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import QuestionCard from '../card/QuestionShowCard';
import QuestionFormCard from '../card/QuestionFormCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';
import TitleBlock from './TitleBlock';
import { FormPage, FormType, question } from '@/interfaces/interfaces';

interface EditPage {
    Form: FormPage
}
const EditPage: React.FC<EditPage> = ({
    Form
}) => {
    const MainState: any = useContext(MainContext)
    const [QuestionList, setQuestionList] = useState<question[]>([])
    const [form, setForm] = useState<FormPage>({
        ...FormType,
        id: Form.id,
        title: Form.title,
        description: Form.description,
        questions: QuestionList
    })



    const addQuestion = useCallback(() => {

        setQuestionList([...QuestionList, FormType.questions[0]])
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
        MainState.updateForm(newForm)
    }

    useEffect(() => {
        setQuestionList(Form.questions)
        setForm({
            ...FormType,
            id: Form.id,
            title: Form.title,
            description: Form.description,
            questions: Form.questions,
            userId: Form.userId,
            userName: Form.userName,
        })
    }, [Form])

    // console.log(form)

    return (
        <div className='w-max-[500px] mx-auto'>
            <TitleBlock Value={form} onChangeValue={setForm} />
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
                <Button onClick={addQuestion}>Add Question</Button>
            </div>
            {/* <div className='my-4'>
                <QuestionFormCard
                    addQuestion={addQuestion}
                    removeQuestion={removeQuestion}
                    updateQuestion={updateQuestion}
                />
            </div> */}
            <div className='my-4'>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
        </div>
    )
}


export default EditPage