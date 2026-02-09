import { useContext } from 'react';
import { ImageContext } from '../contexts/ImageProvider';

export default function Upperbar() {
    const { currentImage, 
            handleClosePopup,
            zoomIn, 
            zoomOut,
            downloadImage } = useContext(ImageContext)!;

    return (
        <div className='upper-bar'>
            <h2 className="img-name">
                {currentImage?.alt_description}
            </h2>
            <div className="control-btn">
                <button onClick={zoomIn}>
                    <i className="fa-solid fa-magnifying-glass-plus"></i>
                </button>
                <button onClick={zoomOut}>
                    <i className="fa-solid fa-magnifying-glass-minus"></i>
                </button>
                <button onClick={downloadImage}>
                    <i className="fa-solid fa-download"></i>
                </button>
                <button onClick={handleClosePopup}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    )
}
