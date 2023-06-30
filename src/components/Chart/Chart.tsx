import { Card } from '@/app/material'
import React from 'react'

const Chart = () => {
  return (
    <div className='w-full'>
      <Card>
        <canvas id="myChart"></canvas>
      </Card>
    </div>
  )
}

export default Chart