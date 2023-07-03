'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { DummyForm, FormPage, TabProps } from '@/interfaces/interfaces'
import React, { Fragment, useEffect, useState } from 'react'
import TabCom from '@/components/Tab/TabMain'
import Responses from '@/components/Tab/Responses'
import Setting from '@/components/Tab/Setting'
import EditPage from '@/components/EditForm/EditPage'
import Navbar from '@/components/Navbar/Navbar'
import MainState from '@/context/mainState'
import { useSearchParams } from 'next/navigation'
import { getLocal } from '@/context/mainReducer'

const FromCrud: React.FC = () => {
  const searchParams = useSearchParams()
  const formId = searchParams.get('id')
  const [form, setForm] = useState<FormPage>({ ...DummyForm, id: `${formId}` })

  const FormTabs: TabProps[] = [
    {
      label: "Questions",
      value: "Questions",
      Body: <EditPage Form={form} />,
    },
    {
      label: "Responses",
      value: "Responses",
      Body: <Responses Form={form} />,
    },
    {
      label: "Setting",
      value: "Setting",
      Body: <Setting />,
    },
  ]


  const findForm = async () => {
    const data = getLocal().data
    const form = data.find((item: FormPage) => item.id === formId)
    setForm(form)
  }

  useEffect(() => {
    findForm()
  }, [])

  return (
    <Fragment>
      <MainState>
        <Navbar title={form.title || ""} />
        <TabCom FormData={FormTabs} TabHeaderCss={'w-60'} />
      </MainState>

    </Fragment>
  )
}

export default FromCrud