import { FormPage, MainState, action } from "@/interfaces/interfaces";
import { createContext } from "react";

interface MainContextInterface {
    state: MainState,
    dispatch: React.Dispatch<action>
    CreateForm: (newForm: FormPage) => void,
    updateForm: (newForm: FormPage) => void,
    deleteForm: (id: string) => void,
}

const MainContext = createContext<MainContextInterface>(
    {
        state: {
            Author: null,
            token: "string" || null,
            data: [],
            isLogged: false,
            loading: false,
            status: 500 || null,
            error: false,
        },
        dispatch: function (value: action): void {
            throw new Error("Function not implemented.");
        },
        CreateForm: function (newForm: FormPage): void {
            throw new Error("Function not implemented.");
        },
        updateForm: function (newForm: FormPage): void {
            throw new Error("Function not implemented.");
        },
        deleteForm: function (id: string): void {
            throw new Error("Function not implemented.");
        }
    }
)

export default MainContext