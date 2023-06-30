import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import MainContext from '@/context/mainContext'
import Navbar from '../Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FormPage, MainStateProvider } from '@/interfaces/interfaces';
import dynamic from 'next/dynamic'
import CardLoading from './CardLoading';
import { Card } from '@/app/material';
import { HiPlus } from 'react-icons/hi2';

const FormCard = dynamic(() => import('./FormCard'), {
    loading: () => <CardLoading />,
    ssr: false
});

const HomePage = () => {

    const MainState = useContext<MainStateProvider>(MainContext)
    const router = useRouter()

    const CreateFormHandle = () => {
        const GenerateId = uuidv4()
        const User = { //TODO: get user data from context
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
            questions: [],
        }
        MainState.dispatch({
            type: 'Create_Form',
            payload: CreateNewFormTemp
        })
        router.push(`/forms/edit/?id=${GenerateId}`)
    }

    const EditFormHandle = (id: string) => {
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
                <Card
                    onClick={CreateFormHandle}
                    shadow={true}
                    className="relative border-[1px] m-4 
                grid h-[20rem] w-[15rem] max-w-[15rem]
                items-center justify-center overflow-hidden
                text-center cursor-pointer">
                    <HiPlus size={100} />
                </Card>

                {MainState.state.data?.map((item: FormPage, index: number) => {
                    return <div key={item.id}
                        onClick={() => { EditFormHandle(item.id) }}>
                        <FormCard id={item.id} title={item.title} MainState={MainState} />
                    </div>
                })}
            </div>
        </React.Fragment>
    )
}

export default HomePage