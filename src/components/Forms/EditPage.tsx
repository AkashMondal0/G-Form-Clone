'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import QuestionCard from '../card/QuestionShowCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';
import TitleBlock from './TitleBlock';
import { FormPage, FormType, question } from '@/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

interface EditPage {
    Form: FormPage
}
const EditPage: React.FC<EditPage> = ({
    Form
}) => {
    const Router = useRouter()
    const MainState: any = useContext(MainContext)
    const [QuestionList, setQuestionList] = useState<question[]>([])
    const [form, setForm] = useState<FormPage>({
        ...FormType,
        id: Form.id,
        title: Form.title,
        description: Form.description,
        questions: QuestionList
    })

    // console.log(Form)

    const addQuestion = useCallback(() => {
        const newQuestion = {
            title: "Untitled Question",
            id: uuidv4(),
            options: [
            ],
            answer: {
                id: uuidv4(),
                value: "Option 1"
            },
            required: false,
        }
        setQuestionList([...QuestionList, newQuestion])
    }, [QuestionList])

    const removeQuestion = useCallback((id: string) => {
        const newData = QuestionList.filter((item) => item.id !== id)
        setQuestionList(newData)
    }, [QuestionList])

    const updateQuestion = useCallback((data: question) => { // TODO : on Mouse Out event update
        const findIndex = QuestionList.findIndex((item) => item.id === data.id)
        QuestionList.splice(findIndex, 1, data)
    }, [QuestionList])


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

    // for question save 
    const handleSubmit = () => {
        const newForm = {
            ...form,
            questions: QuestionList
        }
        // console.log(newForm)
        MainState.updateForm(newForm)
        Router.push('/')
    }

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