import React from 'react'
import { Card, CardHeader } from '@/app/material'

const CardLoading = () => {
    return (
        <div className='m-4 hover:border-gray-500 border-[1px]'>
            <Card
                shadow={true}
                className="relative 
                grid h-[20rem]
                w-[15rem] max-w-[15rem]
                items-end justify-center
              hover:border-gray-500 border-[1px]
                overflow-hidden text-center"
            >
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
                >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
            </Card>
        </div>
    )
}

export default CardLoading