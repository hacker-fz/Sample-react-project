import { useContext } from 'react';
import Feed from './Feed';
import DataContext from './context/DataContext';

const Home = () => {
    const { fetchError, isLoading, searchResults } = useContext(DataContext)
    return (
        <main className="Home">
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="statusMsg">No posts to display.</p>)}
        </main>
    )
}

export default Home