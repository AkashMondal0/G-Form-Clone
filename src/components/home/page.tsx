import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import MainContext from '@/context/mainContext'
import Navbar from '../navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
import PlusForm from './plusForm';
import { FormPage, MainContextInterface } from '@/interfaces/interfaces';

import dynamic from 'next/dynamic'
import CardLoading from './CardLoading';

const FormCard = dynamic(() => import('./FormCard'), {
    loading: () => <CardLoading />,
    ssr: false
});

const HomePage = () => {

    const MainState: any = useContext(MainContext)
    const router = useRouter()

    const HandleAdd = () => {
        const id = uuidv4()
        router.push(`/forms/addForm/`)
    }

    const HandleEdit = (id: string) => {
        router.push(`/forms/${id}`)
    }



    return (
        <React.Fragment>
            <Navbar title='Forms navbar' />
            <div className='w-full justify-center
            items-center
            flex flex-wrap
            gap-4
            '>
                <div onClick={HandleAdd}><PlusForm /></div>
                {MainState.state.data?.map((item: FormPage, index: number) => {
                    return <div key={item.id} onClick={() => { HandleEdit(item.id) }}>
                        <FormCard id={item.id} title={item.title} /></div>
                })}
            </div>
        </React.Fragment>
    )
}

export default HomePage