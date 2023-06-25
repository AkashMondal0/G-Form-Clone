'use client'
import React from 'react'
import MainState from '@/context/mainState'
import HomePage from '@/components/home/page'

function Home() {

  return (
    <>
      <MainState>
        <HomePage />
      </MainState>
    </>
  )
}

export default Home