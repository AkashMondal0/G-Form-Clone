'use client'
import SetQuestion from '@/components/Forms/SetQuestion'
import Question from '@/components/Question'
import React, { useState } from 'react'

interface AddFormProps { }
const AddForm: React.FC<AddFormProps> = () => {
  const [QuestionList, setQuestionList] = useState([
    {
      Qid: "1vsdvsdvsdvs",
      title: 'Akash Favorite Country',
      required: false,
      Option: [
        { id: 1, value: 'USA' },
        { id: 2, value: 'India' },
        { id: 3, value: 'Canada' },
        { id: 4, value: 'Australia' },
        { id: 5, value: 'UK' },
      ]
    },
    {
      Qid: "2vdvvsdvsdv",
      title: 'Olivia Favorite Country',
      required: false,
      Option: [
        { id: 11, value: 'USA' },
        { id: 21, value: 'India' },
        { id: 31, value: 'Canada' },
        { id: 41, value: 'Australia' },
        { id: 51, value: 'UK' },
      ]
    }
  ])

  const [newForm, setNewForm] = useState({
    title: '',
    description: '',
    questions: []
  })

  return (
    <form className="bg-white p-8 justify-center flex">
      <div>
        <div className="mb-4 w-96">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
           Form Title
          </label>
          <input id="Title" type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4 w-96">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Description
          </label>
          <input id="Title" type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <SetQuestion />

        {/* <div className="mb-4 w-96">
          {QuestionList.map((question) => {
            return <Question
              key={question.Qid}
              Qid={question.Qid}
              title={question.title}
              required={question.required}
              Option={question.Option} />
          })}
        </div> */}
      </div>
    </form>
  )
}

export default AddForm