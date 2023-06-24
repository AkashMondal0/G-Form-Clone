import React from 'react'

interface Option {
    id: number
    value: string
}

interface QuestionProps {
    Qid: String
    title: string
    required: boolean
    Option: Option[]
}

const Question: React.FC<QuestionProps> = ({
    title,
    required,
    Option,
    Qid
}) => {
    return (
        <div>
            {required && <span className="text-red-500 mr-1">*</span>}
            <h1 className='my-4 text-lg font-semibold'>{0}) {title || "Akash Favorite Country"}</h1>
            {Option.map((option) => (
                <div key={option.id} className="flex items-center mb-4">
                    <input id={option.value} type="radio" name={`${Qid}`} defaultValue="USA" className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300" aria-labelledby="country-option-1" aria-describedby="country-option-1" defaultChecked />
                    <label htmlFor={option.value} className="text-sm font-medium text-gray-900 ml-2 block">
                        {option.value}
                    </label>
                </div>
            ))}
        </div>

    )
}

export default Question