/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import {
    Card, Menu,
    MenuHandler,
    MenuList,
    MenuItem, Typography,
} from '@/app/material'
import { MainStateProvider, question } from '@/interfaces/interfaces'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GoTrash } from 'react-icons/go'
import { BiText } from 'react-icons/bi'
import { RiShareBoxLine } from 'react-icons/ri'
import { useRouter } from 'next/navigation'

interface FormCardProps {
    id: string,
    userName?: string,
    userId?: string,
    date?: Date,
    questions?: question[]
    title: string,
    MainState?: MainStateProvider,
}

const FormCard: React.FC<FormCardProps> = ({
    id,
    userName,
    userId,
    date,
    questions,
    title,
    MainState
}) => {
    const router = useRouter()

    const remove_form = () => {
        MainState?.dispatch({
            type: 'Remove_Form',
            payload: id
        })
    }
    const EditFormHandle = (id: string) => {
        router.push(`/forms/edit/?id=${id}`)
    }
    const ViewFormHandle = (id: string) => {
        router.push(`/forms/viewForm?id=${id}`)
    }

    return (
        <div className='m-4 cursor-pointer'>
            <Menu placement="right-start">
                <Card className="h-[20rem] w-[15rem] max-w-[15rem] overflow-hidden hover:border-gray-500 border-[1px]" onClick={() => { EditFormHandle(id) }}>
                    {/* image header */}
                    <img
                        className='w-full object-cover'
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                        alt="ui/ux review check"
                    />
                    {/* title header */}
                    <div className='m-3'>
                        <Typography variant="lead" color="gray" className="mt-3 font-normal text-ellipsis overflow-hidden">
                            {title}
                        </Typography>
                    </div>
                    {/* date and edit footer */}
                    <div className="flex items-center justify-between gap-3 m-3">
                        <Typography className="font-normal text-sm">Opened January 10 2023</Typography>
                        <MenuHandler>
                            <button className=' hover:bg-gray-200 w-8 h-8 rounded-full flex justify-center items-center'>
                                <BsThreeDotsVertical size={20} />
                            </button>
                        </MenuHandler>
                    </div>
                </Card>
                <MenuList>
                    <MenuItem className='flex gap-2 text-base'><BiText size={20} />Rename</MenuItem>
                    <MenuItem className='flex gap-2 text-base' onClick={remove_form}><GoTrash size={20} />Remove</MenuItem>
                    <MenuItem className='flex gap-2 text-base' onClick={() => { ViewFormHandle(id) }}>
                        <RiShareBoxLine size={20} />Open in new tab
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    )
}

export default FormCard