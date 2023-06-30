'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

const ViewForm = () => {
    const searchParams = useSearchParams()
    const formId = searchParams.get('id')

    return (
        <div>
            {formId}
        </div>
    )
}

export default ViewForm