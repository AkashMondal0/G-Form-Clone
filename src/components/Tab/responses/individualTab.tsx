import { Card, List, ListItem, Typography } from '@/app/material'
import Pagination from '@/components/Pagination/pagination'
import { DummyForm, FormPage } from '@/interfaces/interfaces'
import React, { useState } from 'react'


interface IndividualTabProp {
    Form: FormPage
}
const IndividualTab: React.FC<IndividualTabProp> = ({
    Form
}) => {

    const { userResponse, questions, id } = Form || DummyForm
    const [index, setIndex] = useState<number>(0) // question index

    const findUserAnswer = (questionId: string) => {
        let data = { id: "", value: "" }
        userResponse[index].userAnswers.map((ans) => {
            if (questionId === ans.questionId) {
                data = { id: ans.userOption.id, value: ans.userOption.value }
            }
        })
        return data.id
    }


    return <React.Fragment>
        <div> User Id - {userResponse[index]?.userId || ""}</div>
        <Card className='p-4 my-4'>
            <div className='flex justify-between'>
                <div className='flex justify-between'>
                    <Pagination
                        index={index}
                        totalLength={userResponse.length}
                        setIndex={setIndex}
                    />
                </div>
            </div>
        </Card>
        <>
            <div>{userResponse[index]?.userAnswers.map((userItem, count) => {
                const question = questions.find((q) => q.id === userItem.questionId)
                return <Card key={count} className='my-4'>
                    <List>
                        <div className='ml-4 m-3 break-words text-start'>
                            <Typography variant="h5">{question?.title || " "}</Typography>
                        </div>
                        {question?.options.map((item, count) => {
                            const ans = findUserAnswer(question?.id)
                            return <ListItem className="p-0" key={count}>
                                <div className="px-3 py-2 flex items-center w-full cursor-pointer">
                                    {item.id === ans ? <span className='mx-2'>✅</span> : <span className='mx-2'>❌</span>}
                                    <Typography color="blue-gray" className="font-medium">{item.value}</Typography>
                                </div>
                            </ListItem>
                        })}
                    </List>
                </Card>
            })}
            </div>
        </>
    </React.Fragment>
}

export default IndividualTab
