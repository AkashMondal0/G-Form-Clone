import Chart from '@/components/Chart/Chart'
import { FormPage } from '@/interfaces/interfaces'
import React from 'react'

interface SummaryTabProp {
    Form: FormPage
}
const SummaryTab: React.FC<SummaryTabProp> = ({
    Form
}) => {
    const { questions } = Form 
    
    return <React.Fragment>
        {questions.map((question, index) => <Chart key={question.id} question={question} />)}
    </React.Fragment>
}

export default SummaryTab
