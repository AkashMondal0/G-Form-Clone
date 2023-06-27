'use client';
import React, { useCallback, useContext, useState } from 'react'
import QuestionCard from '../card/QuestionShowCard';
import QuestionFormCard from '../card/QuestionFormCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';
import TitleBlock from './TitleBlock';
import { FormPage, question } from '@/interfaces/interfaces';
import ReviewPage from './ReviewPage';
import { v4 as uuidv4 } from 'uuid';

enum STEPS {
    Question = 0,
    Review = 1,
}
interface AdminPageProps {
}

const AdminPage: React.FC<AdminPageProps> = ({ }) => {
    const MainState: any = useContext(MainContext)
    const [step, setStep] = useState<STEPS>(STEPS.Question)
    const [QuestionList, setQuestionList] = useState<question[]>([])
    const [Form, setForm] = useState<FormPage>({
        title: '',
        description: '',
        id: uuidv4(), // get path is id
        userName: 'Akash',
        userId: 'Akash',
        date: new Date(),
        questions: []
    })

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

    // for step
    const onBack = () => {
        setStep((prev) => prev - 1)
    }
    const onNext = () => {
        setStep((prev) => prev + 1)
    }

    // for question save 
    const handleSubmit = () => {
        const newForm = {
            ...Form,
            questions: QuestionList
        }
        MainState.FormSubmit(newForm)
        setForm(newForm)
        onNext()
    }

    if (step === STEPS.Review) {
        return <ReviewPage
        onSubmit={MainState.FormSaveLocal}
            onBack={onBack}
            data={MainState}
            Form={Form} />
    }

    if (step === STEPS.Question) {
        return (
            <div>
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
}

export default AdminPage