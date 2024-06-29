import { RoutesName } from "@/App/RoutesName";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const SONG_LIST = `${BASE_URL}${RoutesName.ITEMS_SONGS}`;
export const IMAGE_LIST = (image_url?:string) => `${BASE_URL}${RoutesName.ASSETS}/${image_url}`
