import { useContext, useMemo } from 'react';
import { ImageContext } from '../contexts/ImageProvider';
import type { UnsplashImage } from '../custom_hooks/useUnsplash';

export default function LowerCarousel() {
    const { activeImages, currentImageIndex } = useContext(ImageContext)!;
    
    const carouselItems = useMemo(() => {
        const count = activeImages.length;
        if (count === 0) return [];

        const items: { img: UnsplashImage; offset: number }[] = [];
        
        const visibleCount = Math.min(5, count);
        
        const startOffset = -Math.floor(visibleCount / 2);

        for (let i = 0; i < visibleCount; i++) {
            const offset = startOffset + i;
            const index = (currentImageIndex + offset + count) % count;
            const img = activeImages[index];
            if (img) items.push({ img, offset });
        }
        
        return items;
    }, [activeImages, currentImageIndex]);

    return (
        <div className='carousel-container'>
            {carouselItems.map(({ img, offset }) => {
                return (
                    <img 
                        key={img.id} 
                        src={img.urls.regular} 
                        alt={img.alt_description}
                        className={`carousel-img ${offset === 0 ? 'active' : ''}`} 
                    />
                )
            })}
        </div>
    )
}