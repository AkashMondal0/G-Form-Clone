import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import MainContext from '@/context/mainContext'
import Navbar from '../navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
const HomePage = () => {
    const MainState = useContext(MainContext)
    const router = useRouter()
    const HandleAdd = () => {
        const id = uuidv4()
        router.push(`/uploadForm=${id}`)
    }


    return (
        <div>
            <Navbar title='Forms navbar' />
            <div className="container bg-neutral-300 w-full h-full">
                <div className="row">
                    <div className="col-12">
                        <div className="h-20 w-20 border" onClick={HandleAdd}>
                            add
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage