'use client';
import React, { useContext, useState } from 'react'
import QuestionCard from '../card/QuestionCard';
import QuestionFormCard from '../card/QuestionFormCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';
import TitleBlock from './TitleBlock';
import { option, question } from '@/interfaces/interfaces';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


enum STEPS {
    Question = 0,
    Review = 1,
}

const AdminPage = () => {
     const router = useRouter()
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
                    router.push('/')
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