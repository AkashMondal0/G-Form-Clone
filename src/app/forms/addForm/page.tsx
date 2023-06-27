'use client'
import AdminPage from '@/components/Forms/AdminPage'
import MainState from '@/context/mainState'
import React from 'react'

interface editFormProps {

}
const editForm: React.FC<editFormProps> = ({ }) => {

  return (
    <form className="bg-white p-8 justify-center flex">
      <div>
        <MainState>
          <AdminPage />
        </MainState>
      </div>
    </form>
  )
}

export default editForm