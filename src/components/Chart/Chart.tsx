import React, { useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { question } from '@/interfaces/interfaces';
ChartJS.register(ArcElement, Tooltip, Legend);

interface ChartProps {
  question: question
}

const Chart: React.FC<ChartProps> = ({
  question
}) => {
  const { title, options, responses } = question

  const setValues = () => {
    const labelArray: string[] = []
    const DataArray: number[] = []
    options.map((item) => {
      labelArray.push(item.value)
      DataArray.push(item.responsesCount!)
    })
    return { labelArray, DataArray }
  }


  const data = {
    labels: setValues().labelArray, // answer Option
    datasets: [
      {
        label: ' of Votes',
        data: setValues().DataArray,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div className='w-full flex justify-center bg-white rounded-xl shadow-md my-5 pb-5'>
      <div className='w-full p-5'>
        <div className="block text-gray-700 text-xl mb-2">
          {title}
        </div>
        <div className="block text-gray-700 text-sm mb-2">
          Response {responses.length}
        </div>
        <div className='w-full flex justify-center '>
          <div className='w-72 h-72 text-center'>
            <Pie data={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chart
