import { Card, Radio, Typography } from '@/app/material'
import DropDown from '@/components/DropDown/DropDown'
import Pagination from '@/components/Pagination/pagination'
import { FormPage, userAnswers } from '@/interfaces/interfaces'
import React, { useState } from 'react'
import IndividualTab from './individualTab'

interface QuestionTabProp {
  Form: FormPage
}
interface steps {
  step: number,
  Data: userAnswers[]
}
const QuestionTab: React.FC<QuestionTabProp> = ({
  Form
}) => {
  const { questions, id, userResponse } = Form
  const [index, setIndex] = useState<number>(0) // question index

  const individualTab = (userId: string) => {
    userResponse.find((item) => {
      if (item.userId === userId) {
       
      }
    })
  }


  return <> <React.Fragment>
    <Card className='p-4'>
      <div className='my-4 flex justify-between'>
        <DropDown
          setIndex={setIndex}
          index={index}
          questions={questions} />
        <Pagination
          index={index}
          totalLength={questions.length}
          setIndex={setIndex}
        />
      </div>
    </Card>
    <Card className='my-4'>
      <div className='ml-4 m-3 break-words text-start'>
        <Typography variant="h5">{questions[index]?.title}</Typography>
      </div>
    </Card>
    {questions[index]?.responses.map((item, index) => <div key={index}>
      <Card className='my-4'>
        <div className='flex items-center px-4'>
          <Radio
            name={item.id}
            id={item.id}
            ripple={false}
            className="hover:before:opacity-0"
            containerProps={{
              className: "p-0"
            }}
            disabled
            defaultChecked={true} />
          <div className='ml-4 m-3 break-words text-start'>
            <Typography variant="h5">{item.userOption.value}</Typography>
          </div>
        </div>
        <hr className='mx-5' />
        <div className='ml-4 m-3 break-words text-start text-blue-500 text-base cursor-pointer'>
          <Typography variant="h6">Response</Typography>
        </div>
      </Card>
    </div>)}
  </React.Fragment></>
}

export default QuestionTab
