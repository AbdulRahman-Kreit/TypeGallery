import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageProvider';
import { Link } from 'react-router-dom'

export default function MainHeader() {
    const { query, setQuery, handleSearch } = useContext(ImageContext)!;

    return (
        <div className='main-header'>
            <h2>TypeGallery</h2>
            <form className="search-bar" onSubmit={handleSearch}>
                <button onClick={handleSearch}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <input 
                    type="text" 
                    name="search" 
                    id="search" 
                    className='search-field'
                    placeholder='Search Images...' 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} />
            </form>
            <Link to={'/favorite'}>
                Favorite <i className="fa-solid fa-heart"></i>
            </Link>
        </div>
    )
}
