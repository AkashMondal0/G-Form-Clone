import { FormPage } from '@/interfaces/interfaces'
import React, { useEffect, useState } from 'react'


interface TitleBlockProps {
    Value: FormPage ,
    onChangeValue: (data: FormPage) => void
}
const TitleBlock: React.FC<TitleBlockProps> = ({ Value, onChangeValue }) => {
    const [Title, setTitle] = useState<string>('No Title')
    const [Description, setDescription] = useState<string>('No Description')

    const setInput = () => {
        onChangeValue({
            ...Value,
            title: Title,
            description: Description,
        })
    }

    useEffect(() => {
        setTitle(Value.title)
        setDescription(Value.description)
    }, [Value])

    return (
        <React.Fragment>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Form Title
                </label>
                <input onBlur={setInput}
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="Title" type="text" placeholder="Title" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 
                    text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Description
                </label>
                <input
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    onBlur={setInput}
                    id="Title" type="text" placeholder="Description" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
        </React.Fragment>
    )
}

export default TitleBlock