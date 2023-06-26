import React from 'react'
import { Avatar, Card, CardBody, CardHeader, Typography } from '@/app/material'

const CardLoading = () => {
  return (
    <div>
         <div className='m-4'>
            <Card
                shadow={true}
                className="relative 
                grid h-[20rem]
                w-[12rem] max-w-[12rem]
                 items-end justify-center
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
                {/* <CardBody className="relative py-14 px-6 md:px-12">
                    <Typography
                        variant="h4"
                        color="white"
                        className="mb-6 font-medium leading-[1.5]"
                    >
                       Title - Projects Akash  
                    </Typography>
                    <Typography variant="h6" className="mb-4 text-gray-400">
                        Account Name
                    </Typography>
                    <Avatar
                        size={`lg`}
                        variant="circular"
                        alt="candice wu"
                        className="border-2 border-white"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                </CardBody> */}
            </Card>
        </div>
    </div>
  )
}

export default CardLoading