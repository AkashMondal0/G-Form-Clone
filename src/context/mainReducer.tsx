// Date: 04/08/21
interface option {
    id: string,
    value: string,
}

interface question {
    id: string,
    title: string,
    options: option[],
    answer: string,
    required: boolean,
}

interface FormPage {
    userName: string,
    userId: string,
    date: Date,
    page: question[]
}

interface action {
    type: string,
    payload: question[]
}

export const MainReducer = (state: any, action: action) => {
    switch (action.type) {
        case 'AUTHOR':
            return {
                ...state,
            }
        case 'SUBMIT_UPLOAD_FORM':
            const data = action.payload

            const newForm : FormPage = {
                userName: 'akash olivia',
                userId: 'fwofwefiohwiofh',
                date: new Date(),
                page: data
            }
            return {
                ...state,
                data: newForm,
            }
        default:
            return state
    }
}