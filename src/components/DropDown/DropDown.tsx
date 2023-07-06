import { question } from "@/interfaces/interfaces";
import { Select, Option } from "@material-tailwind/react";

interface DropDownProp {
    questions: question[]
    setIndex: (index: number) => void
    index: number
}

const DropDown: React.FC<DropDownProp> = ({
    questions,
    setIndex,
    index
}) => {
    return (
        <div className="w-72">
            <Select
                defaultValue={questions[index].title}
                label={questions[index].title}>
                {questions.map((item, index: number) => <Option
                    onClick={() => { setIndex(index) }} key={index}
                    value={item.id}>{item.title}</Option>)}
            </Select>
        </div>
    );
}

export default DropDown
