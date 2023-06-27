/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button, Typography } from '@/app/material'
import ViewQCard from '@/components/viewForm/ViewQCard'
import { FormPage } from '@/interfaces/interfaces'
import React, { Fragment, useEffect, useState } from 'react'

interface ViewFormProps {

}

const ViewForm: React.FC<ViewFormProps> = ({ params }: any) => {

    const [form, setForm] = useState<FormPage>()

    const findForm = async () => {
        const data = localStorage.getItem('GoForm')
        const parsedData = JSON.parse(data!)
        const form = parsedData.data.find((item: FormPage) => item.id === params.formId)
        setForm(form)

    }

    useEffect(() => {
        findForm()
    }, [])

    console.log(form)

    return (
        <Fragment>
            <div className='flex justify-center p-8'>
                <div className='text-center'>
                    <div className='my-6 lg:mb-20'>
                        <Typography variant="h1">{form?.title || "Loading..."}</Typography>
                        <Typography variant="lead">{form?.description || ""}</Typography>
                    </div>
                    <div className='flex justify-center'>
                        <div className='max-w-[500px]'>
                            {form?.questions.map((item, index) => {
                                return (
                                    <ViewQCard key={index} question={item} ShowAnswer={false} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div >
            <div className={`w-full flex justify-between p-8 ${form?.title ? "" : "hidden"}`} >
                <Button color='red' onClick={() => {

                }}>Back</Button>

                <Button color='blue' onClick={() => {

                }}>Submit</Button>
            </div>
        </Fragment>
    )
}

export default ViewForm