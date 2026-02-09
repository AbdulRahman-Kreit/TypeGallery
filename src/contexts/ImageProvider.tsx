/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import useUnsplash from '../custom_hooks/useUnsplash';
import type { UnsplashImage } from '../custom_hooks/useUnsplash';

interface ImageContextTypes {
    query: string;
    setQuery: (value: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    images: UnsplashImage[];
    activeImages: UnsplashImage[];
    isPopupOpen: boolean;
    handleOpenPopup: (id: string, source?: 'explore' | 'favorite') => void;
    handleClosePopup: () => void;
    goToNext: () => void;
    goToPrevious: () => void;
    currentImageIndex: number;
    currentImage: UnsplashImage | undefined;
    scale: number;
    zoomIn: () => void;
    zoomOut: () => void;
    downloadImage: () => Promise<void>;
    favorite: UnsplashImage[];
    toggleFavorite: (image: UnsplashImage) => void;
}

export const ImageContext = createContext<ImageContextTypes | undefined>(undefined);

interface ProviderProps {
    children: ReactNode;
}

export default function ImageProvider({ children }: ProviderProps) {
    // Required States
    const [query, setQuery] = useState<string>('');
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [scale, setScale] = useState<number>(1);
    const [activeSource, setActiveSource] = useState<'explore' | 'favorite'>('explore');
    
    const [favorite, setFavorite] = useState<UnsplashImage[]>(() => {
        const savedFavorites = localStorage.getItem('fav_list');
        return savedFavorites ? JSON.parse(savedFavorites) : []
    });

    useEffect(() => {
        localStorage.setItem('fav_list', JSON.stringify(favorite));
    }, [favorite]);

    // From custom hook (useUnsplash)
    const { images, searchImages } = useUnsplash();

    // For fetching images when open explore page
    useEffect(() => {
        searchImages('nature');
    }, [searchImages]);

    // For Seach Images
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query) searchImages(query);
    }

    const activeImages = activeSource === 'explore' ? images : favorite;

    // --- Popup Logic --- 
    const handleOpenPopup = (id: string, source: 'explore' | 'favorite' = 'explore') => {
        setActiveSource(source);
        const currentList = source === 'explore' ? images : favorite;
        const index = currentList.findIndex(i => i.id === id);
        setCurrentImageIndex(index);
        setIsPopupOpen(true)
    }

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setScale(1);
    }

    const goToNext = useCallback(() => {
        setCurrentImageIndex((prev) => (prev + 1) % activeImages.length); 
    }, [activeImages.length]);

    const goToPrevious = useCallback(() => {
        setCurrentImageIndex((prev) => (prev - 1 + activeImages.length) % activeImages.length); 
    }, [activeImages.length]);

    const currentImage = activeImages[currentImageIndex];

    // For zoom in & zoom out
    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3));
    
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5));
    
    // For downloading the image
    const downloadImage = async () => {
        if (!currentImage) return;

        try {
            const response = await fetch(currentImage.urls.regular);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = `image-${currentImage.id}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch(error) {
            console.error('Download failed!', error);
        }
    }

    // To add /remove images to favorite list
    const toggleFavorite = (image: UnsplashImage) => {
        setFavorite((prev) => {
            const isExist = prev.find(item => item.id === image.id);
            if (isExist) {
                return prev.filter((fav) => fav.id !== image.id);
            } else {
                return [...prev, image];
            }
        })
    }

    return (
        <ImageContext.Provider value={{
            query,
            setQuery,
            handleSearch,
            images,
            activeImages,
            isPopupOpen,
            handleOpenPopup,
            handleClosePopup,
            goToNext,
            goToPrevious,
            currentImageIndex,
            currentImage,
            scale,
            zoomIn,
            zoomOut,
            downloadImage,
            favorite,
            toggleFavorite
        }}>
            { children }
        </ImageContext.Provider>
    )
}