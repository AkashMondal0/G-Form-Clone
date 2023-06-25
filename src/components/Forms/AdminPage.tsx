'use client';
import React, { useContext, useState } from 'react'
import QuestionCard from '../card/QuestionCard';
import QuestionFormCard from '../card/QuestionFormCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';
import TitleBlock from './TitleBlock';

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
    removeQuestion?: (id: string) => void,
    updateQuestion?: (data: question, id: string) => void,
}

enum STEPS {
    Question = 0,
    Review = 1,
}

const AdminPage = () => {
    const MainState: any = useContext(MainContext)
    const [step, setStep] = useState<STEPS>(STEPS.Question)
    // for step
    const onBack = () => {
        setStep((prev) => prev - 1)
    }
    const onNext = () => {

        setStep((prev) => prev + 1)
    }


    if (step === STEPS.Review) {
        return (
            <div>
                review
                <Button onClick={onBack}>Back</Button>
                <Button onClick={() => {
                    localStorage.setItem('data', JSON.stringify(MainState.state))
                }}>save data</Button>
            </div>)
    }

    if (step === STEPS.Question) {
        return (
            <div>
                <TitleBlock />
                {MainState.QuestionList.map((item: question, index: number) => {
                    return (
                        <QuestionCard
                            key={index}
                            index={index}
                            title={item.title}
                            options={item.options}
                            answer={item.answer}
                            required={item.required}
                            id={item.id}
                            updateQuestion={MainState.updateQuestion}
                            removeQuestion={MainState.removeQuestion} />
                    )
                })}
                {/* Question static */}
                <QuestionFormCard
                    title={''}
                    options={[]}
                    answer={''}
                    required={false}
                    id={''}
                    addQuestion={MainState.addQuestion}
                    removeQuestion={MainState.removeQuestion}
                    updateQuestion={MainState.updateQuestion}
                />

                <Button onClick={() => {
                    MainState.handleSubmit()
                    onNext()
                }}>Submit</Button>
            </div>
        )
    }
}

export default AdminPage