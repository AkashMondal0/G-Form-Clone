import React from 'react'
interface NavBarProps {
    title: string
}

const Navbar: React.FC<NavBarProps> = ({
    title
}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light h-16">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">{title}</a>
            </div>
        </nav>

    )
}

export default Navbar