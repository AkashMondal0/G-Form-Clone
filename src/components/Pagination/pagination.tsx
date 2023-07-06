import { Button, IconButton } from '@/app/material';
import React, { useState } from 'react'

interface Pagination {
    totalLength: number
    index: number
    setIndex: (index: number) => void
}

const Pagination: React.FC<Pagination> = ({
    totalLength,
    index,
    setIndex
}) => {


    const next = () => {
        if (index < totalLength - 1) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1)
        } else {
            setIndex(totalLength - 1)
        }
    };

    return <div className="flex items-center gap-4">
        <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={index === 0}
        >
            {/* <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />  */}
            Previous
        </Button>
        <div className="flex items-center gap-2">

            <div>{index + 1}</div>
            of
            <div>{totalLength}</div>
        </div>
        <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2"
            onClick={next}
            disabled={index === totalLength - 1}
        >
            Next
            {/* <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> */}
            
        </Button>
    </div>
}

export default Pagination
