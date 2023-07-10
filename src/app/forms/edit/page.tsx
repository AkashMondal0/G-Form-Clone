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
import { ReadForm } from '@/app/form'
import { editPageLoading } from '@/hook/Loading'
import { getLocal } from '@/context/mainReducer'

const FromCrud: React.FC = () => {
  const searchParams = useSearchParams()
  const formId = searchParams.get('id') || ""
  const [form, setForm] = useState<FormPage>({ ...DummyForm, id: `${formId}` })
  const Loading = editPageLoading()

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
  const [activeTab, setActiveTab] = useState<string>(FormTabs[0].value);


  const findForm = async () => {
    const data = await ReadForm(formId) as FormPage
    if (data.userId === getLocal()) {
      setForm(data)
      Loading.stopLoading()
    } else {

    }
  }

  useEffect(() => {
    Loading.startLoading()
    if (formId) {
      findForm()
    }
  }, [])

  if (Loading.isLoading) {
    return <div>you are not the owner of this form</div>
  }

  return (
    <Fragment>
      <MainState>
        <Navbar title={form?.title || ""} />
        <TabCom
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          FormData={FormTabs}
          TabHeaderCss={'w-60'} />
      </MainState>
    </Fragment>
  )
}

export default FromCrud