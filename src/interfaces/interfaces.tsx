import { v4 as uuidv4 } from 'uuid';
export interface Author {
  name: string,
  email: string,
  password: string,
  date: Date
  forms: FormPage[]
}
export interface MainState {
  Author: Author | null,
  token: string | null,
  data: FormPage[] | [],
  isLogged: boolean,
  loading: boolean,
  status: number | null,
  error: boolean,
}
// reducer
export interface action {
  type: string,
  payload: any
}
export interface MainStateProvider {
  state: MainState,
  dispatch: React.Dispatch<action>,
}
// question
export interface option {
  id: string,
  value: string,
}
export interface ResponseOption {
  userId: string,
  optionValue: option
}
export interface userResponse {
  id: string,
  formId: string,
  userId: string,
  userAnswers: question[],
}
export interface question {
  title: string,
  id: string,
  options: option[],
  answer: option,
  required: boolean,
  responses: ResponseOption[]
}
export interface sendAnswer extends ResponseOption {
  questionId: string
}
// form data
export interface FormPage {
  id: string,
  userName: string,
  userId: string,
  date: Date,
  title: string,
  description: string,
  questions: question[],
  userResponse: userResponse[]
}
// form tabs
export interface TabProps {
  label: string,
  value: string,
  Body: React.ReactElement
}
export const DummyForm = {
  id: uuidv4(), // get path is id
  userName: "null",
  userId: "null",
  date: new Date(),
  title: "Untitled Form",
  description: "Add Description",
  questions: [
    {
      title: "Untitled Question",
      id: uuidv4(),
      options: [],
      answer: {
        id: uuidv4(),
        value: "Option 1"
      },
      required: false,
    },
  ],
}
