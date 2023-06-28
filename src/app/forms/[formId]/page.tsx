'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Typography } from '@/app/material'
import { FormPage, FormType, TabProps } from '@/interfaces/interfaces'
import React, { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import TabCom from '@/components/Tab/Tab'
import Responses from '@/components/Tab/Responses'
import Setting from '@/components/Tab/Setting'

const ViewForm = dynamic(() => import('@/components/viewForm/ViewForm'),
    { ssr: false })

const FormDetails: React.FC = ({ params }: any) => {

    const [form, setForm] = useState<FormPage>(FormType)

    const FormTabs: TabProps[] = [
        {
            label: "Question",
            value: "Question",
            Body: <ViewForm form={form} ShowAnswer />,
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
        const form = parsedData.data.find((item: FormPage) => item.id === params.formId)
        setForm(form)
    }

    useEffect(() => {
        findForm()
    }, [])


    return (
        <Fragment>
                {/* heading  */}
                <div className='flex justify-between items-center m-5'>
                    <Typography variant='h4' className='font-bold'>
                        {form.title}
                    </Typography>
                </div>
                {/* tabs  */}
                <TabCom FormData={FormTabs} />
        </Fragment>
    )
}

export default FormDetails