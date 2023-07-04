import React from 'react'
import { FormPage, TabProps } from '@/interfaces/interfaces'
import TabMain from './TabMain'
import QuestionTab from './responses/questionTab'
import SummaryTab from './responses/summaryTab'
import IndividualTab from './responses/individualTab'

interface ResponsesTabProps {
    Form: FormPage
}

const ResponsesTab: React.FC<ResponsesTabProps> = ({
    Form
}) => {
    const FormTabs: TabProps[] = [
        {
            label: "Summary",
            value: "Summary",
            Body: <SummaryTab Form={Form} />,
        },
        {
            label: "Question",
            value: "Question",
            Body: <QuestionTab Form={Form} />,
        },
        {
            label: "Individual",
            value: "Individual",
            Body: <IndividualTab Form={Form} />,
        },
    ]

    return (
        <div className='w-full justify-center flex bg-gray-200 min-h-screen'>
            <TabMain
                FormData={FormTabs}
                TabHeaderCss='w-[600px] 
                bg-white h-20 rounded-3xl'
                TabIndicatorCss='mx-10' />
        </div>
    )
}

export default ResponsesTab