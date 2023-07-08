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
        const GenerateId: string = uuidv4()
        const User = { //TODO: get user data from context
            userName: MainState.state.Author?.name || "no user",
            userId: MainState.state.Author?.uid || "",
        }
        const CreateNewFormTemp: FormPage = {
            id: GenerateId,
            userName: User.userName,
            userId: User.userId,
            date: new Date(),
            title: "Untitled Form",
            description: "Add Description",
            questions: [],
            userResponse: []
        }
        MainState.dispatch({
            type: 'Create_Form',
            payload: CreateNewFormTemp
        })
        router.push(`/forms/edit/?id=${GenerateId}`)
    }



    return (
        <React.Fragment>
            <Navbar title='Forms' />
            <div className='w-full justify-center
            items-center
            flex flex-wrap
            gap-4
            bg-gray-200
            min-h-[100vh]
            '>
                <Card
                    onClick={CreateFormHandle}
                    shadow={true}
                    className="relative m-4 
                grid h-[20rem] w-[15rem] max-w-[15rem]
                hover:border-gray-500 border-[1px]
                items-center justify-center overflow-hidden
                text-center cursor-pointer">
                    <HiPlus size={100} />
                    <div></div>
                </Card>

                {MainState.state.data?.map((item: FormPage) => {
                    return <FormCard key={item.id} id={item.id} title={item.title} MainState={MainState} />
                })}
            </div>
        </React.Fragment>
    )
}

export default HomePage