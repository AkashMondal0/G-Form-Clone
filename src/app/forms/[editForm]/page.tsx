'use client'
import AdminPage from '@/components/Forms/AdminPage'
import MainState from '@/context/mainState'
import React, { useContext, useState } from 'react'

interface editForm {
  editForm?: string
}
interface editFormProps {
  params?: editForm
}
const editForm: React.FC<editFormProps> = ({ params }) => {

  return (
    <form className="bg-white p-8 justify-center flex">
      <div>
        <MainState>
          <AdminPage formId={params?.editForm || "none"} />
        </MainState>
      </div>
    </form>
  )
}

export default editForm