import React from 'react'
import Chart from '../Chart/Chart'
import { FormPage, TabProps } from '@/interfaces/interfaces'
import TabMain from './TabMain'
import QuestionTab from './responses/questionTab'
import SummaryTab from './responses/summaryTab'

interface ResponsesTabProps {
    Form: FormPage
}

const ResponsesTab: React.FC<ResponsesTabProps> = ({
    Form
}) => {
    const { questions } = Form
    const FormTabs: TabProps[] = [
        {
            label: "Summary",
            value: "Summary",
            Body: <React.Fragment>
                {questions.map((question, index) => <Chart key={question.id} question={question} />)}
            </React.Fragment>,
        },
        {
            label: "Question",
            value: "Question",
            Body: <QuestionTab Form={Form} />,
        },
        {
            label: "Individual",
            value: "Individual",
            Body: <SummaryTab Form={Form} />,
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