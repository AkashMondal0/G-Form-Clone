'use client'
import React, { useState } from 'react'
const getLocal = () => { 
  const list = localStorage.getItem('question')
  if (list) {
    return JSON.parse(localStorage.getItem('question') || "")
  } else {
    return []
  }
}
const Form = () => {
  const [name, setName] = useState(getLocal())
  return (
    <div>
      <h1>{name[0].title}</h1>
    </div>
  )
}

export default Form