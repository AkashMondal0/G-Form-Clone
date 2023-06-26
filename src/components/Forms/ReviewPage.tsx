import { Button } from '@/app/material'
import { MainContextInterface } from '@/interfaces/interfaces'
import { useRouter } from 'next/navigation'
import React from 'react'


interface ReviewPageProps {
    data: MainContextInterface
    onBack?: () => void
    onDone?: () => void
}

const ReviewPage: React.FC<ReviewPageProps> = ({ data,
    onBack,
    onDone
}) => {
    const router = useRouter()
    return (
        <div>
            <h1>Review Page</h1>
            <Button onClick={onBack}>Back</Button>
            <h1>data save</h1>
            <Button onClick={() => {
                router.push('/forms/')
                localStorage.setItem('GoForm', JSON.stringify(data.state))
            }}>save data</Button>
        </div>
    )
}

export default ReviewPage