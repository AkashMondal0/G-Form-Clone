'use client'
import Question from '@/components/Forms/AdminPage'
import MainState from '@/context/mainState'
import React, { useContext, useState } from 'react'

interface AddFormProps { }
const AddForm: React.FC<AddFormProps> = () => {

  return (
    <form className="bg-white p-8 justify-center flex">
      <div>
        <div className="mb-4 w-96">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Form Title
          </label>
          <input id="Title" type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="mb-4 w-96">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Description
          </label>
          <input id="Title" type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <MainState>
          <Question />
        </MainState>
      </div>
    </form>
  )
}

export default AddForm