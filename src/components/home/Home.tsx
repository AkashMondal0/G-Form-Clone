/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import MainContext from '@/context/mainContext'
import Navbar from '../Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FormPage, MainStateProvider } from '@/interfaces/interfaces';
import dynamic from 'next/dynamic'
import CardLoading from './CardLoading';
import { Avatar, Card, Menu, MenuHandler, MenuItem, MenuList } from '@/app/material';
import { HiPlus } from 'react-icons/hi2';
import { CreateForm } from '@/app/form';
import { RiShareBoxLine } from 'react-icons/ri';

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

        CreateForm(CreateNewFormTemp)
        router.push(`/forms/edit/?id=${GenerateId}`)
    }


    const SearchBar = () => (
        <div>
            <input
                id="Search" type="text" placeholder="Search"
                className={`
        appearance-none 
        border
        py-2 px-4
        bg-gray-200
        leading-tight 
        focus:outline-none
        focus:border-gray-400
        focus:bg-white
        focus:drop-shadow
        rounded-lg
        w-full
        `} />
        </div>
    )
    const handleLogout = () => {
        MainState.dispatch({
            type: 'LOGOUT',
            payload: null
        })
        router.push('/')
    }
    const Right = (
        <div className="flex items-center w-full justify-end pr-5">
            <Menu>
                <MenuHandler>
                    <Avatar className='cursor-pointer'
                        src="https://scontent.fccu31-1.fna.fbcdn.net/v/t39.30808-6/326480418_709699390877747_700119594772420980_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bA_SMTtidUUAX_BSEQU&_nc_ht=scontent.fccu31-1.fna&oh=00_AfDho5HcenHj_HMD1kVB9RKtKDnihDxRWNVm6ti6bWlprg&oe=64B2538D" alt="avatar" size="sm" />
                </MenuHandler>
                <MenuList>
                    <MenuItem className='flex gap-2 text-base'>Profile</MenuItem>
                    <MenuItem className='flex gap-2 text-base'>About</MenuItem>
                    <MenuItem className='flex gap-2 text-base' onClick={handleLogout}>
                        <RiShareBoxLine size={20} />LogOut
                    </MenuItem>
                </MenuList>
            </Menu>
        </div >)

    return (
        <React.Fragment>
            <Navbar title='Forms'
                center={SearchBar()}
                right={Right} />
            <div className='
            w-full justify-center
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
                    <img src="https://ssl.gstatic.com/docs/templates/thumbnails/forms-blank-googlecolors.png"
                        alt="plus"
                        className="" />
                </Card>

                {MainState.state.data?.map((item) => {
                    return <FormCard key={item} id={item} MainState={MainState} />
                })}
            </div>
        </React.Fragment>
    )
}

export default HomePage