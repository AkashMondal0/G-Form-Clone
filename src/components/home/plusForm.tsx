import React from 'react'
import { Avatar, Card, CardBody, CardHeader, Typography } from '@/app/material'
import { HiPlus } from 'react-icons/hi2'

const PlusForm = () => {
    return (
        <div className='m-4 '>
            <Card
                shadow={true}
                className="relative border-[1px] 
                grid h-[20rem] w-[12rem] max-w-[12rem]
                items-center justify-center overflow-hidden
                text-center cursor-pointer">
                <HiPlus size={100} />
            </Card>
        </div>
    )
}

export default PlusForm