'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'


function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push('/forms/')
  }, [router])

  return (
    <React.Fragment>
      Home -- Login
    </React.Fragment>
  )
}

export default Home