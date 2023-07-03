'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import QuestionCard from './QuestionCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';
import TitleBlock from './TitleBlock';
import { FormPage, MainStateProvider, question } from '@/interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
// import { BsPlusCircle } from 'react-icons/bs';

interface EditPage {
    Form: FormPage
}
const EditPage: React.FC<EditPage> = ({
    Form
}) => {
    const Router = useRouter()
    const MainState = useContext<MainStateProvider>(MainContext)
    const [QuestionList, setQuestionList] = useState<question[]>([])
    const [form, setForm] = useState<FormPage>({
        ...Form,
        title: "Untitled Form",
        description: "No Description",
    })

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
            responses: []
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
            id: Form.id,
            title: Form.title,
            description: Form.description,
            questions: Form.questions,
            userId: Form.userId,
            userName: Form.userName,
            date: Form.date,
            userResponse: Form.userResponse
        })
    }, [Form])

    // for question save 
    const handleSubmit = () => {
        const newForm = {
            ...form,
            questions: QuestionList
        }
        MainState.dispatch({
            type: 'Update_Form',
            payload: newForm
        })
        Router.push('/')
    }

    const handleLink = () => {
        Router.push(`/forms/viewForm?id=${form.id}`)
    }

    // console.log(Form)
    return (
        <div className='mx-auto min-h-[100vh]'>
            <TitleBlock Value={form} onChangeValue={setForm} />

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
                            removeQuestion={removeQuestion} 
                            responses={item.responses} />
                    </div>
                )
            })}
            <div className='my-4'>
                <Button className='w-full' onClick={addQuestion}>
                    {/* <BsPlusCircle size={20} /> */}
                    Add Question</Button>
            </div>
            <div className='my-4'>
                <Button onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
            <div className='my-4'>
                <Button color='green' onClick={handleLink}>
                    Link
                </Button>
            </div>
        </div>
    )
}


export default EditPage