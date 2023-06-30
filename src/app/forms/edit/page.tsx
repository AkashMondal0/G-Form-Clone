'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { FormPage, TabProps } from '@/interfaces/interfaces'
import React, { Fragment, useEffect, useState } from 'react'
import TabCom from '@/components/Tab/Tab'
import Responses from '@/components/Tab/Responses'
import Setting from '@/components/Tab/Setting'
import EditPage from '@/components/EditForm/EditPage'
import Navbar from '@/components/Navbar/Navbar'
import MainState from '@/context/mainState'
import { useSearchParams } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
const DummyForm = {
  id: uuidv4(), // get path is id
  userName: "null",
  userId: "null",
  date: new Date(),
  title: "Untitled Form",
  description: "Add Description",
  questions: [
    {
      title: "Untitled Question",
      id: uuidv4(),
      options: [
      ],
      answer: {
        id: uuidv4(),
        value: "Option 1"
      },
      required: false,
    },
  ],
}
const FromCrud: React.FC = () => {
  const searchParams = useSearchParams()
  const formId = searchParams.get('id')
  const [form, setForm] = useState<FormPage>({ ...DummyForm, id: `${formId}` })

  const FormTabs: TabProps[] = [
    {
      label: "Question",
      value: "Question",
      Body: <EditPage Form={form} />,
    },
    {
      label: "Responses",
      value: "Responses",
      Body: <Responses />,
    },
    {
      label: "Setting",
      value: "Setting",
      Body: <Setting />,
    },
  ]

  const findForm = async () => {
    const data = localStorage.getItem('GoForm')
    const parsedData = JSON.parse(data!)
    const form = parsedData.data.find((item: FormPage) => item.id === formId)
    setForm(form)
  }

  useEffect(() => {
    findForm()
  }, [])

  return (
    <Fragment>
      <MainState>
        <Navbar title={form.title || ""} />
        <TabCom FormData={FormTabs} />
      </MainState>

    </Fragment>
  )
}

export default FromCrud