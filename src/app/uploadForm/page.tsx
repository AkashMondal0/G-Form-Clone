'use client'
import Question from '@/components/Forms/AdminPage'
import MainState from '@/context/mainState'
import React, { useContext, useState } from 'react'

interface AddFormProps { }
const AddForm: React.FC<AddFormProps> = () => {

  return (
    <form className="bg-white p-8 justify-center flex">
      <div>
        <MainState>
          <Question />
        </MainState>
      </div>
    </form>
  )
}

export default AddForm