import { Avatar, Typography } from '@/app/material'
import React from 'react'
interface NavBarProps {
    title: string
}

const Navbar: React.FC<NavBarProps> = ({
    title
}) => {
    return (
        <div className='flex justify-between items-center p-2 shadow-lg'>
            {/* navbar  logo*/}
            <div className='flex items-center gap-3'>
                <Avatar src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png" alt="avatar" variant="rounded" />
                <div className='text-gray-600 text-2xl'>
                    {title}
                </div>
            </div>
        </div>

    )
}

export default Navbar