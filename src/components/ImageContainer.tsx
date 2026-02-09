import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageProvider';
import ImagePopup from './ImagePopup';

export default function ImageContainer() {
    const { images, 
            handleOpenPopup, 
            isPopupOpen, 
            favorite, 
            toggleFavorite } = useContext(ImageContext)!;
    
    return (
        <div className="img-container">
                {images.map(image => {
                    const isFavorite = favorite.some(fav => fav.id === image.id);

                    return (
                    <div className="img-card" key={image.id} onClick={() => handleOpenPopup(image.id, 'explore')}>
                        <img src={image.urls.regular} alt={image.alt_description} />
                        <div className="overlay">
                            <button 
                                className="fav-btn" 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(image);
                                }}>
                                { isFavorite === true ? 
                                <i className="fa-solid fa-heart"></i> : 
                                <i className="fa-regular fa-heart"></i> }
                            </button>
                        </div>
                    </div>
                    )
                })}

                {isPopupOpen && 
                    <ImagePopup />
                }
            </div>
    )
}