'use client';
import React, {useContext } from 'react'
import QuestionCard from '../card/QuestionCard';
import QuestionFormCard from '../card/QuestionFormCard';
import { Button } from '@/app/material';
import MainContext from '@/context/mainContext';

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


const AdminPage = () => {
    const MainState: any = useContext(MainContext)

    return (
        <div>
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

            <Button onClick={MainState.handleSubmit}>Submit</Button>
        </div>
    )
}

export default AdminPage