'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { DummyForm, FormPage, TabProps } from '@/interfaces/interfaces'
import React, { Fragment, useEffect, useState } from 'react'
import TabCom from '@/components/Tab/TabMain'
import Responses from '@/components/Tab/Responses'
import Setting from '@/components/Tab/Setting'
import EditPage from '@/components/EditForm/EditPage'
import Navbar from '@/components/Navbar'
import MainState from '@/context/mainState'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReadForm } from '@/app/form'
import { editPageLoading } from '@/hook/Loading'
import { getLocal } from '@/context/mainReducer'
import { Button } from '@/app/material'

const FromCrud: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const formId = searchParams.get('id') || ""
  const [form, setForm] = useState<FormPage>({ ...DummyForm, id: `${formId}` })
  const Loading = editPageLoading()
  const handleLink = () => {
    router.push(`/forms/viewForm?id=${form.id}`)
  }
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
      setTimeout(() => {
        Loading.stopLoading()
      }, 1000);
    } else {

    }
  }

  useEffect(() => {
    Loading.startLoading()
    if (formId) {
      findForm()
    }
  }, [])

  const Right = (
    <div className="flex items-center w-full justify-end pr-5">
      <Button onClick={handleLink}>
        send
      </Button>
    </div >)

  return (
    <Fragment>
      <MainState>
        <Navbar title={form?.title || ""} right={Right} />
        {Loading.isLoading ?
          <div className='bg-gray-200 min-h-screen'>you are not the owner of this form</div> :
          <>
            <TabCom
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              FormData={FormTabs}
              TabHeaderCss={'w-60'} />
          </>
        }
      </MainState>
    </Fragment>
  )
}

export default FromCrud