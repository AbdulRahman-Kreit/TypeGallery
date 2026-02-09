import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageProvider';
import ImagePopup from '../components/ImagePopup';

export default function Favorite() {
    const { handleOpenPopup, isPopupOpen, favorite, toggleFavorite } = useContext(ImageContext)!;

    return (
        <section className='favorite'>
            <div className="fav-header">
                <Link to='/'>
                    <i className="fa-solid fa-chevron-left"></i>
                </Link>
                <h1>Your Favorite</h1>
            </div>

            <div className="fav-list"> 
                {favorite.map(image => {
                    const isFavorite = favorite.some(fav => fav.id === image.id);
                
                    return (
                        <div className="img-card" key={image.id} onClick={() => handleOpenPopup(image.id, 'favorite')}>
                            <img src={image.urls.regular} alt={image.alt_description} />
                            <div className="overlay">
                                <button 
                                    className="fav-btn" 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(image);
                                    }}>
                                    {isFavorite ? 
                                        <i className="fa-solid fa-heart"></i> : 
                                        <i className="fa-regular fa-heart"></i>
                                    }
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {isPopupOpen && <ImagePopup />}
        </section>
    );
}