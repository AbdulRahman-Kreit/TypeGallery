import { useState, useCallback } from 'react';

export interface UnsplashImage {
    id: string;
    urls: { regular: string };
    alt_description: string;
}

const useUnsplash = () => {
    const [images, setImages] = useState<UnsplashImage[]>([]);

    const searchImages = useCallback(async (query: string) => {
        const accessKey = import.meta.env.VITE_UNSPLASH_KEY_ACCESS;
        const url = `https://api.unsplash.com/search/photos?client_id=${accessKey}&query=${query}&per_page=12`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data && data.results) {
                setImages(data.results);
            } else {
                setImages([]);
            }
        } catch(error) {
            console.log("Image Fetching Error", error);
        }
    }, []);

    return { images, searchImages };
};

export default useUnsplash
