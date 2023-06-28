'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { FormPage, FormType, TabProps } from '@/interfaces/interfaces'
import React, { Fragment, useEffect, useState } from 'react'
import TabCom from '@/components/Tab/Tab'
import Responses from '@/components/Tab/Responses'
import Setting from '@/components/Tab/Setting'
import EditPage from '@/components/Forms/EditPage'
import Navbar from '@/components/navbar/Navbar'


const FormDetails: React.FC = ({ params }: any) => {
  const [form, setForm] = useState<FormPage>(FormType)

  const FormTabs: TabProps[] = [
    {
      label: "Question",
      value: "Question",
      Body: <EditPage/>,
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
    const form = parsedData.data.find((item: FormPage) => item.id === params.id)
    setForm(form)
  }

  useEffect(() => {
    findForm()
  }, [])


  return (
    <Fragment>
      <Navbar title={form.title} />
      <TabCom FormData={FormTabs} />
    </Fragment>
  )
}

export default FormDetails