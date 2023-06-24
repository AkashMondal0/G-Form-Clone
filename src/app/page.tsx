'use client'
import Form from '@/components/Forms/Form'
import Navbar from '@/components/Navbar'
import React from 'react'
import { useRouter } from 'next/navigation'

function Home() {
  const router = useRouter()
  const HandleAdd = () => {
    router.push('/addForm')
  }
  return (
    <div>
      <Navbar title='Forms' />
      <div className="container bg-neutral-300 w-full h-full">
        <div className="row">
          <div className="col-12">
            <div className="h-20 w-20 border" onClick={HandleAdd}>
              add
            </div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home