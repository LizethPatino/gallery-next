import { ImageType } from '@/types';
import axios from 'axios';

const UNSPLASH_API_URL = process.env.UNSPLASH_API_URL!;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY!;

export async function getUnsplashImages() : Promise<ImageType[]>{
    try {
        const response = await axios.get(UNSPLASH_API_URL, {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
          params: {
            per_page: 10,
          },
        });
    
        return response.data;
      } catch (error) {
        console.error('Error fetching images:', error);
        return [];
      }    
}
