/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { DummyForm, FormPage } from '@/interfaces/interfaces'
import ViewForm from '@/components/viewForm/ViewForm'
import MainState from '@/context/mainState'
import { ReadForm } from '@/app/form'

const ViewFormPage = () => {
    const searchParams = useSearchParams()
    const formId = searchParams.get('id') || ""
    const [form, setForm] = useState<FormPage>({ ...DummyForm, id: `${formId}` })

    const findForm = async () => {
        const data = await ReadForm(formId) as FormPage
        setForm(data)
    }

    useEffect(() => {
    if (formId) {
        findForm()
    }
    }, [])

    return (
        <React.Fragment>
            <MainState>
                <ViewForm form={form} ShowAnswer={false} />
            </MainState>
        </React.Fragment>
    )
}

export default ViewFormPage