import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import MainContext from '@/context/mainContext'
import Navbar from '../navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
import PlusForm from './plusForm';
import { FormPage, FormType, MainStateProvider } from '@/interfaces/interfaces';
import dynamic from 'next/dynamic'
import CardLoading from './CardLoading';

const FormCard = dynamic(() => import('./FormCard'), {
    loading: () => <CardLoading />,
    ssr: false
});

const HomePage = () => {

    const MainState = useContext<MainStateProvider>(MainContext)
    const router = useRouter()

    const HandleAdd = () => {
        const GenerateId = uuidv4()
        const User = {
            userName: "Akash",
            userId: "92188918291",
        }
        const CreateNewFormTemp = {
            id: GenerateId, // get path is id
            userName: User.userName,
            userId: User.userId,
            date: new Date(),
            title: "Untitled Form",
            description: "Add Description",
            questions: FormType.questions,
        }
        MainState.CreateForm(CreateNewFormTemp)
        router.push(`/forms/edit/?id=${GenerateId}`)
    }

    const HandleEdit = (id: string) => {
        router.push(`/forms/edit/?id=${id}`)
    }



    return (
        <React.Fragment>
            <Navbar title='Forms' />
            <div className='w-full justify-center
            items-center
            flex flex-wrap
            gap-4
            '>
                <div onClick={HandleAdd}><PlusForm /></div>
                {MainState.state.data?.map((item: FormPage, index: number) => {
                    return <div key={item.id} onClick={() => { HandleEdit(item.id) }}>
                        <FormCard id={item.id} title={item.title} deleteForm={MainState.deleteForm} /></div>
                })}
            </div>
        </React.Fragment>
    )
}

export default HomePage