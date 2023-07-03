import ViewQCard from '@/components/viewForm/ViewQCard'
import { FormPage, sendAnswer } from '@/interfaces/interfaces'
import React from 'react'

interface QuestionTabProp {
  Form: FormPage
}

const QuestionTab: React.FC<QuestionTabProp> = ({
  Form
}) => {
  const { questions } = Form
  // console.log(Form)
  return <React.Fragment>
    {questions.map((question, index) => <ViewQCard key={question.id}
      question={question} ShowAnswer={true} index={index} sendAnswer={() => { }} />)}
  </React.Fragment>
}

export default QuestionTab
