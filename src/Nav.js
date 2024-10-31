import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const Nav = () => {
    const { search, setSearch } = useContext(DataContext)

    return (
        <nav className='Nav'>
            <form onSubmit={(e) => e.preventDefault()} className='searchForm'>
                <input
                    id='search'
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="about">about</Link></li>
            </ul>
        </nav>
    )
}

export default Nav