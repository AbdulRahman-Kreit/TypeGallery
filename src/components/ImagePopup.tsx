import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageProvider';
import Upperbar from './Upperbar';
import LowerCarousel from './LowerCarousel';

export default function ImagePopup() {
    const { currentImage, goToNext, goToPrevious, scale } = useContext(ImageContext)!;

    return (
        <div className='popup-container'>
            <Upperbar />
            <div className="popup-content">
                <button onClick={goToPrevious}>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <div className="img-wrapper">
                    <img 
                    src={currentImage?.urls.regular} 
                    alt={currentImage?.alt_description}
                    style={{ transform: `scale(${scale})`, transition: `0.3s` }} />
                </div>
                <button onClick={goToNext}>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
            <LowerCarousel />
        </div>
    )
}
