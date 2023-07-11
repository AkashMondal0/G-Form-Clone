/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { DummyForm, FormPage } from '@/interfaces/interfaces'
import ViewForm from '@/components/viewForm/ViewForm'
import MainState from '@/context/mainState'
import { ReadForm } from '@/app/form'
import { getLocal } from '@/context/mainReducer'
import { editPageLoading } from '@/hook/Loading'

const ViewFormPage = () => {
    const searchParams = useSearchParams()
    const formId = searchParams.get('id') || ""
    const [form, setForm] = useState<FormPage>({ ...DummyForm, id: `${formId}` })
    const Loading = editPageLoading()
    const router = useRouter()

    const findForm = async () => {
        const data = await ReadForm(formId) as FormPage
        if (getLocal()) {
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

    return (
        <React.Fragment>
            {Loading.isLoading ?
                <div className='bg-gray-200 min-h-screen justify-center items-center flex'>
                    <span className='hover:underline hover:text-blue-500 cursor-pointer' onClick={() => {
                        router.push('/login')
                    }}>
                        Login Page
                    </span>
                </div> :
                <MainState>
                    <ViewForm form={form} ShowAnswer={false} />
                </MainState>}
        </React.Fragment>
    )
}

export default ViewFormPage