import { Avatar, Typography } from '@/app/material'
import { useRouter } from 'next/navigation'
import React from 'react'
interface NavBarProps {
    title: string
    center?:  React.ReactElement
    right?:  React.ReactElement
}

const Navbar: React.FC<NavBarProps> = ({
    title,
    center,
    right
}) => {
    const router = useRouter()
    return (
        <div className='flex justify-between items-center p-2 shadow-sm top-0 sticky z-50 bg-white'>
            {/* navbar  logo*/}
            <div className='flex items-center gap-3 w-1/3'>
                <Avatar
                className='cursor-pointer'
                onClick={() => {
                    router.push('/forms/')
                }} src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png" alt="avatar" variant="rounded" />
                <div className='text-gray-600 text-2xl'>
                    {title}
                </div>
            </div>
            <div className="w-1/3">
                {center}
            </div>
            <div className='w-1/3'>
                {right}
            </div>
        </div>

    )
}

export default Navbar