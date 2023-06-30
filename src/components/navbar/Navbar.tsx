import { Avatar, Typography } from '@/app/material'
import { useRouter } from 'next/navigation'
import React from 'react'
interface NavBarProps {
    title: string
}

const Navbar: React.FC<NavBarProps> = ({
    title
}) => {
    const router = useRouter()
    return (
        <div className='flex justify-between items-center p-2 shadow-sm top-0 sticky z-50 bg-white'>
            {/* navbar  logo*/}
            <div className='flex items-center gap-3'>
                <Avatar onClick={()=>{
                    router.push('/')
                }} src="https://www.gstatic.com/images/branding/product/1x/forms_2020q4_48dp.png" alt="avatar" variant="rounded" />
                <div className='text-gray-600 text-2xl'>
                    {title}
                </div>
            </div>
        </div>

    )
}

export default Navbar