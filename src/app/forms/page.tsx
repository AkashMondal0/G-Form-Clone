'use client'
import React from 'react'
import MainState from '@/context/mainState'
import HomePage from '@/components/Home/Home'

function Forms() {

  return (
    <>
      <MainState>
        <HomePage />
      </MainState>
    </>
  )
}

export default Forms