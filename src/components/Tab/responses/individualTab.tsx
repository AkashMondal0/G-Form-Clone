import ViewQCard from '@/components/viewForm/ViewQCard'
import { question, sendAnswer, userAnswers } from '@/interfaces/interfaces'
import React from 'react'

interface IndividualTabProp {
    questions: question[],
    UserSelectedData: userAnswers[]

}
const IndividualTab: React.FC<IndividualTabProp> = ({
    questions,
    UserSelectedData,
}) => {

    const findUserAnswer = (questionId: string) => {
        let data: string = "no data"
        UserSelectedData.find((item) => {
            if (item.questionId === questionId) {
                data = item.userOption.id
            }
        })
        return data
    }

    // console.log(UserSelectedData)
    return <React.Fragment>
        {/* <div> User Id - {UserSelectedData[0]?.userId||""}</div> */}
        {questions?.map((item, index) => <ViewQCard key={index}
            question={item}
            ShowAnswer={true}
            index={index}
            UserSelectedData={findUserAnswer(item.id) || "no data"}
            sendAnswer={() => { }} />)}
    </React.Fragment>
}

export default IndividualTab
