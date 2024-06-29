import { useTranslation } from 'react-i18next';



export const useTexts = () => {
    const {t} = useTranslation()

    return {
        Spotify:t('Spotify'),
        ForYour:t('For You'),
        TopTracks:t('Top Tracks'),
        inputLabel:t('Search Song, Artist'),

    }
}