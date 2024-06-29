import { IMAGE_LIST, SONG_LIST } from "@/Constant/ApiRoutes";
import axios from "axios";

export const SONG_LIST_FETCH = async () => {
  try {
    const res = await axios.get(SONG_LIST);
    return res.data;
  } catch (error) {
    console.error("Error fetching song list:", error);
    throw error;
  }
};


export const IMAGE_DATA = async (imageUrl: string): Promise<string> => {
  const coverUrl  = IMAGE_LIST(imageUrl);
  const response = await fetch(coverUrl , {
    method: 'GET',
    headers: {
      'Content-Type': 'image/jpeg',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cover image');
  }

  const blob = await response.blob();
  const imageBlobUrl  = URL.createObjectURL(blob);
  return imageBlobUrl;
};
