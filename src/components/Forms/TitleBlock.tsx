import React from 'react'

const TitleBlock = () => {
    return (
        <div>
            <div className="mb-4 w-96">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Form Title
                </label>
                <input id="Title" type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4 w-96">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Description
                </label>
                <input id="Title" type="text" placeholder="Title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
        </div>
    )
}

export default TitleBlock