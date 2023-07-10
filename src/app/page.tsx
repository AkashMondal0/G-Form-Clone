'use client'
import { getLocal } from '@/context/mainReducer'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = getLocal()
    if (token) {
      router.push('/forms/')
    } else {
      router.push('/login/')
    }
  }, [router])

  return (
    <React.Fragment>Loading....</React.Fragment>
  )
}

export default Home