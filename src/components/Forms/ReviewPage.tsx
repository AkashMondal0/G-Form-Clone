import { Button } from '@/app/material'
import { FormPage, MainContextInterface } from '@/interfaces/interfaces'
import { useRouter } from 'next/navigation'
import React from 'react'
import ViewForm from '../viewForm/ViewForm'


interface ReviewPageProps {
    data: MainContextInterface
    onBack?: () => void
    onDone?: () => void
    Form: FormPage
    onSubmit: () => void
}

const ReviewPage: React.FC<ReviewPageProps> = ({
    data,
    onBack,
    onDone,
    Form,
    onSubmit
}) => {
    const router = useRouter()
    console.log(Form)
    return (
        <React.Fragment>
            <div className='w-full'>
                <ViewForm form={Form} ShowAnswer={true} />
                <div className={`w-full flex justify-between p-8`} >
                    <Button color='red' onClick={onBack}>Back</Button>
                    <Button color='blue' onClick={() => {
                        onSubmit()
                        router.push('/forms')
                        // post data to server
                    }}>Submit</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ReviewPage